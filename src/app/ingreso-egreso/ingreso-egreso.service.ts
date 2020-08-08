import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from '../ingreso-egreso/ingreso-egreso.model';
import { FireauthService } from '../auth/fireauth.service';
import { AppState } from '../app.reducer';
import { filter, map } from 'rxjs/operators';
import { SetItemsAction, UnsetItemsAction } from './ingreso-egreso.actions';
import { Subscribable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IngresoEgresoService {
  ingresoEgresoListerner: Subscription = new Subscription();
  ingresoEgresoItemsListener: Subscription = new Subscription();

  constructor(
    private afDB: AngularFirestore,
    public authService: FireauthService,
    private store: Store<AppState>
  ) {}

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    const user = this.authService.getUsuario();
    return this.afDB
      .doc(`${user.uid}/ingresos-egresos`)
      .collection('items')
      .add({ ...ingresoEgreso });
  }

  borrarIngresoEgreso( uid: string) {
    const user = this.authService.getUsuario();
    return this.afDB.doc(`${user.uid}/ingresos-egresos/items/${uid}`)
    .delete();
  }

  initIngresoEgresoListener() {
    //const user = this.authService.getUsuario();
    this.ingresoEgresoListerner = this.store
      .select('auth')
      .pipe(filter((auth) => auth.user != null))
      .subscribe((auth) => {
        this.ingresoEgresoItems(auth.user.uid);
      });
  }

  private ingresoEgresoItems(uid: string) {
    this.ingresoEgresoItemsListener = this.afDB
      .collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map((docData) => {
          return docData.map((doc) => {
            return {
              uid: doc.payload.doc.id,
              monto: doc.payload.doc.data()['monto'],
              descripcion: doc.payload.doc.data()['descripcion'],
              tipo: doc.payload.doc.data()['tipo'],
              // ...doc.payload.doc.data()
            };
          });
        })
      )
      .subscribe((coleccion) => {
        this.store.dispatch(new SetItemsAction(coleccion));
      });
  }

  cancelarSuscripciones() {
    this.ingresoEgresoItemsListener.unsubscribe();
    this.ingresoEgresoListerner.unsubscribe();
    this.store.dispatch( new UnsetItemsAction());
  }
}
