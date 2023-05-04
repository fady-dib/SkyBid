import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanActivate{

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('canActivate called')
    const allowed_role = route.data['allowed_role']
    let isloggedIn = this.authService.isAuthenticated(allowed_role);
    if(isloggedIn) {
      return true 
    }
    else { 
      this.router.navigate(['/login'])
      return false
    }
  }



}
