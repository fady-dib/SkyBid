import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  isAuthenticated() : boolean {
   const token = localStorage.getItem('token')
   if(token){
    return true
   }
   return false
  }

  getUserRole(){
    return localStorage.getItem('role')
  }

  
}
