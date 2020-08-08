import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { FireauthService } from 'src/app/auth/fireauth.service';
import { filter } from 'rxjs/operators';
import { IngresoEgresoService } from 'src/app/ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit, OnDestroy {
  private suscripcion = new Subscription();
  nombre: string = 'Invitado';
  constructor(
    private auth: FireauthService,
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) {}

  ngOnInit(): void {
    this.suscripcion = this.store
      .select('auth')
      .pipe(filter((auth) => auth.user != null))
      .subscribe((auth) => (this.nombre = auth.user.nombre));
  }

  cerrarSesion() {
    this.auth.cerrarSesion();
    this.ingresoEgresoService.cancelarSuscripciones()
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }
}
