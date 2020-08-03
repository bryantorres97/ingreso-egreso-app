import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireauthService } from 'src/app/auth/fireauth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  constructor(private auth: FireauthService) { }

  ngOnInit(): void {
  }

  cerrarSesion(){
    this.auth.cerrarSesion();

  }

}
