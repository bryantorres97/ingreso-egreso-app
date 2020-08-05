import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import {
  ActivarLoadingAction,
  DesactivarLoadingAction,
} from '../shared/ui.actions';
import { SetUserAction } from './auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FireauthService {

  private suscripcionUsuario: Subscription = new Subscription();

  constructor(
    private afAuth: AngularFireAuth,
    private afDB: AngularFirestore,
    private router: Router,
    private store: Store<AppState>
  ) {}

  registrarUsuario(nombre: string, email: string, password: string) {
    this.store.dispatch(new ActivarLoadingAction());
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((resp) => {
        // console.log(resp);
        const user: User = {
          uid: resp.user.uid,
          email: resp.user.email,
          nombre: nombre,
        };

        this.afDB
          .doc(`${user.uid}/usuario`)
          .set(user)
          .then(() => this.router.navigate(['/']));
        this.store.dispatch(new DesactivarLoadingAction());
      })
      .catch((error) => {
        this.store.dispatch(new DesactivarLoadingAction());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
          footer: 'Something went wrong!',
        });
      });
  }

  initAuthListener() {
    this.afAuth.authState.subscribe((fbUser) => {
      if(fbUser) {
        this.suscripcionUsuario = this.afDB.doc(`${fbUser.uid}/usuario`).valueChanges()
        .subscribe( (userObj: any) => {
          const usuario = new User( userObj );
          this.store.dispatch( new SetUserAction(usuario)); 
        })
      } else {
        this.suscripcionUsuario.unsubscribe();
      };
    });
  }

  loginMail(email: string, password: string) {
    this.store.dispatch(new ActivarLoadingAction());
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((resp) => {
        console.log(resp);
        this.router.navigate(['/dashboard']);
        this.store.dispatch(new DesactivarLoadingAction());
      })
      .catch((error) =>
        {
          this.store.dispatch(new DesactivarLoadingAction());
          Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
          footer: 'Something went wrong!',
        })}
      );
  }

  cerrarSesion() {
    this.afAuth
      .signOut()
      .then(() => this.router.navigate(['/login']))
      .catch((error) =>
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
          footer: 'Something went wrong!',
        })
      );
  }

  estaAutenticado() {
    return this.afAuth.authState.pipe(
      map((fbUser) => {
        if (fbUser === null) {
          this.router.navigate(['/login']);
        }

        return fbUser != null;
      })
    );
  }
}
