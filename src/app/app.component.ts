import { Component, OnInit } from '@angular/core';
import { FireauthService } from './auth/fireauth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ingresos-egresos-app';

  constructor( public authService: FireauthService) { }

  ngOnInit(): void {
    this.authService.initAuthListener();
  }
}
