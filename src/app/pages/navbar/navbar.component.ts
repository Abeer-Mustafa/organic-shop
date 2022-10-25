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
  appUser: User = {};
  
  constructor(private authService: AuthService){
    authService.appUser$.subscribe((appUSer: any) => this.appUser = appUSer);
  }

  logout(){
    return this.authService.logout();
  }
}
