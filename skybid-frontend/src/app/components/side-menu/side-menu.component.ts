import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.is_loading = false;
    }, 2000);
  }
  

  isCurrentRoute(route: string): boolean {
    return this.router.url === route;
  }

  is_loading : boolean = true


user_role = this.authService.getUserRole()

}
