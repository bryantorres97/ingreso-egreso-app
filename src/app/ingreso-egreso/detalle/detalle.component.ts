import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {
  items: IngresoEgreso[];
  itemsSuscripcion: Subscription = new Subscription();
  constructor(private store: Store<AppState>, private ingresoEgresoService: IngresoEgresoService) { }
  
  ngOnInit(): void {
    this.itemsSuscripcion = this.store.select('ingresoEgreso').subscribe( ingresosEgresos => {
      console.log(ingresosEgresos.items);
      this.items = ingresosEgresos.items;
    })
  }
  
  ngOnDestroy(): void {
    this.itemsSuscripcion.unsubscribe();
  }


  borrarItem( uid: string) {
    this.ingresoEgresoService.borrarIngresoEgreso(uid).then( () => {
      Swal.fire({
        title: 'Elemento eliminado',
        icon: 'success'
      })
    }).catch( err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      })
    })
  }

}
