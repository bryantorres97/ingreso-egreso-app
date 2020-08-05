import { Component, OnInit, OnDestroy } from '@angular/core';
import { FireauthService } from '../fireauth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit, OnDestroy {
  cargando: boolean;
  suscripcion: Subscription;

  constructor(
    private authService: FireauthService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.suscripcion = this.store.select('ui').subscribe((ui) => (this.cargando = ui.isLoading));
  }

  onSubmit(forma: any) {
    this.authService.loginMail(forma.email, forma.password);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.suscripcion.unsubscribe();
  }
}
