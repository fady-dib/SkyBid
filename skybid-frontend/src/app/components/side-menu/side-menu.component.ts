import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {

  constructor(public authService: AuthService) {}

  selected_page: string = 'request-list';


selectPage(page: string): void {
  this.selected_page = page;
}

user_role = this.authService.getUserRole()

}
