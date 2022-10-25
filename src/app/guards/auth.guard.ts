import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private autsService: AuthService,
    private router : Router,
    ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.autsService.user$.pipe(
        map((user:any) => {
          if(user){
            return true
          }
          else{
            this.router.navigate(['login'], {
              queryParams: {returnUrl: state.url}
            });
            return false;
          }
      })
      )
    }

}
