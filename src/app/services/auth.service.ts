
import { Injectable } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

import { GoogleAuthProvider } from 'firebase/auth';
import { getAuth, signInWithPopup, signOut } from "firebase/auth";
import * as firebaseAdmin from 'firebase-admin';

import { auth } from '../../../firebaseConfig';
import { SessionService } from './session.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

// import { User } from "./../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;

  constructor(
    private router: Router,
    private session: SessionService,
    private route: ActivatedRoute,
    private authFi: AngularFireAuth
  ){
    this.user$ = this.authFi.authState;
  }

  login() {
    return signInWithPopup(auth, new GoogleAuthProvider())
    .then((result: any) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      let credential = GoogleAuthProvider.credentialFromResult(result);

      let token = credential?.accessToken;
      this.session.set(token);

      // The signed-in user info.
      let user = result?.user;

      let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
      console.log(returnUrl);
      this.router.navigate([returnUrl || '/']);
    })
  }

  logout() {
    this.router.navigateByUrl('login');
    return signOut(auth);
  }

  isLogged(){
    this.authFi.authState.subscribe(user => {
      if(user){
        console.log(user)
        return true
      }
      else{
        console.log('User is signed out');
        return false;
      }
    })
  }

  getUser(){
    this.authFi.authState.subscribe(user => {
      if(user){
        return {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          emailVerified: true,
          isAdmin: true,
        }
      }
      else{
        return null;
      }
    })
  }
}
