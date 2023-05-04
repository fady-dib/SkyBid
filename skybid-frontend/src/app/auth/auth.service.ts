import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }
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

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login'] );
  }


  
}
