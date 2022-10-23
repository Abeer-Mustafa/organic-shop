
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

  constructor(
    private router: Router,
    private session: SessionService,
    private route: ActivatedRoute,
    private authFi: AngularFireAuth
  ){}

  login() {
    return this.GoogleLogin(new GoogleAuthProvider());
  }
  logout() {
    return this.GoogleLogout();
  }

  // Auth logic to run auth providers
  GoogleLogin(provider: any) {
    // const auth = getAuth();

    return signInWithPopup(auth, provider)
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
    .catch((error) => {
      console.log(error);

      let errorCode = error.code;
      console.log(errorCode);

      let errorMessage = error.message;
      console.log(errorMessage);

      // The email of the user's account used.
      let errorEmail = error.customData.email;
      console.log(errorEmail);

      // The AuthCredential type that was used.
      let errorCredential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorCredential);
    });
  }

  GoogleLogout() {
    // const auth = getAuth();

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

    // const auth = getAuth();
    // const user = auth.currentUser;

    // if (user) {
    //   let displayName = user.displayName;
    //   let email = user.email;
    //   console.log(displayName);
    //   console.log(email);
    //   return user;
    // }
    // else {
    //   console.log('User is signed out');
    //   return null;
    // }
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
