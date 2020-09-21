import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  Route,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { take } from 'rxjs/operators';
import { FireauthService } from './fireauth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate, CanLoad {
  constructor(public auth: FireauthService) {}
  canActivate() {
    return this.auth.estaAutenticado();
  }
  canLoad() {
    return this.auth.estaAutenticado().pipe(take(1));
  }
}
