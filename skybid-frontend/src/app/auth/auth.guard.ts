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
    console.log('canActivate called');
    let isloggedIn = this.authService.isAuthenticated();
  
    if (isloggedIn) {
      const allowed_role = route.data['allowed_role'];
      const user_role = this.authService.getUserRole()
  
      if (allowed_role.includes(user_role)) {
        return true;
      } else {
        switch (user_role) {
          case 'admin':
            this.router.navigate(['/dashboard']);
            break;
          case 'operator':
            this.router.navigate(['/request-list']);
            break;
          case 'broker':
            this.router.navigate(['/broker-requests']);
            break;
          default:
            this.router.navigate(['']);
            break;
        }
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }





}
