import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import Swal from 'sweetalert2';
// import { AppState } from '../app.reducer';
import * as fromIngresoEgreso from './ingreso-egreso.reducer'
import { Subscription } from 'rxjs';
import {
  ActivarLoadingAction,
  DesactivarLoadingAction,
} from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [],
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  forma: FormGroup;
  tipo = 'ingreso';
  loadingSubs: Subscription = new Subscription();
  cargando: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<fromIngresoEgreso.AppStateIE>
  ) {}

  ngOnInit(): void {
    this.loadingSubs = this.store.select('ui').subscribe((ui) => {
      this.cargando = ui.isLoading;
    });
    this.forma = this.formBuilder.group({
      descripcion: new FormControl('', Validators.required),
      monto: new FormControl(0, [Validators.required, Validators.min(0)]),
    });
  }

  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe();
  }

  crearIngresoEgreso() {
    this.store.dispatch(new ActivarLoadingAction());
    const ingresoEgreso = new IngresoEgreso({
      ...this.forma.value,
      tipo: this.tipo,
    });
    console.log(ingresoEgreso);
    this.ingresoEgresoService
      .crearIngresoEgreso(ingresoEgreso)
      .then(() => {
        this.store.dispatch(new DesactivarLoadingAction());
        Swal.fire(
          ingresoEgreso.descripcion,
          'Se ha registrado correctamente su ' + ingresoEgreso.tipo,
          'success'
        );
        this.forma.reset({ monto: 0 });
      })
      .catch((err) => {
        this.store.dispatch(new DesactivarLoadingAction());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo ha salido mal',
        });
        console.log(err);
      });
  }
}
