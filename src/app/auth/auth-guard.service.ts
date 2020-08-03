import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { FireauthService } from './fireauth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(public auth: FireauthService) { }
  canActivate() {   
    return this.auth.estaAutenticado();
  }
}
