import { Inject, Injectable, forwardRef } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SocketService } from '../services/socket.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,

    ) { }
  

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

  getToken(){
    return localStorage.getItem('token')
  }



  
}
