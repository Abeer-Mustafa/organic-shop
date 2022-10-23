import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  getToken(){
    localStorage.getItem('token');
  }

  remove(){
    localStorage.removeItem('token');
  }

  set(token: any){
    localStorage.setItem('token', token);
  }
}
