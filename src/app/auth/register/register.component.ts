import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FireauthService } from '../fireauth.service';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {

  cargando: boolean;
  suscripcion: Subscription;

  constructor(private authService: FireauthService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('ui').subscribe( ui => this.cargando = ui.isLoading );
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.suscripcion.unsubscribe();
  }

  onSubmit( forma: any) {    
    this.authService.registrarUsuario(forma.nombre, forma.email, forma.password);
    
  }

}
