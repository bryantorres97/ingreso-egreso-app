import { Component, OnInit } from '@angular/core';
import { FireauthService } from '../fireauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  constructor(private authService: FireauthService) { }

  ngOnInit(): void {
  }

  onSubmit(forma: any) {
    
    this.authService.loginMail(forma.email, forma.password);
  }

}
