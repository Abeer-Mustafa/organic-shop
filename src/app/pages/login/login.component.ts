import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: any;

  constructor(
    private authService: AuthService,
    private au: AngularFireAuth
  ){
  }

  login(){
    return this.authService.login();
  }
}
