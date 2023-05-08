import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isloggedIn = this.authService.isAuthenticated();

    if (isloggedIn) {
      const userRole = this.authService.getUserRole();
      switch (userRole) {
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
    } else {
      return true;
    }
  }
}
