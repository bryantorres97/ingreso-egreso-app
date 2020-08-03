import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FireauthService } from '../fireauth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  constructor(private authService: FireauthService) { }

  ngOnInit(): void {
  }

  onSubmit( forma: any) {    
    this.authService.registrarUsuario(forma.nombre, forma.email, forma.password);
    
  }

}
