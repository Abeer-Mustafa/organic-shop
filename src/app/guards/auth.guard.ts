import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private autsService: AuthService,
    private router : Router,
    private authFi: AngularFireAuth
    ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      // this.authFi.authState.subscribe(user => {
      //   if(user){
      //     console.log(user)
      //     return true
      //   }
      //   else{
      //     console.log('User is signed out');
      //     this.router.navigate(['login'], {
      //       queryParams: {returnUrl: state.url}
      //     });
      //     return false;
      //   }
      // })
      return false;
    }

}
