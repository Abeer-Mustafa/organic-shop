import { Component } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  user$: any;
  active = 1;

  constructor(
    private authService: AuthService,
    private authFi: AngularFireAuth
  ){

    this.authFi.authState.subscribe(user => {
      if(user){
        this.user$ = {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          emailVerified: true,
          isAdmin: true,
        }
      }
      else{
        this.user$ = null;
      }
    })
  }

  logout(){
    return this.authService.logout();
  }
}
