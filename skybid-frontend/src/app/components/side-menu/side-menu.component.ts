import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  constructor(public authService: AuthService) {}

  ngOnInit() {
    setTimeout(() => {
      this.is_loading = false;
    }, 2000);
  }
  

  selected_page: string = 'request-list';

  is_loading = true


selectPage(page: string): void {
  this.selected_page = page;
}

user_role = this.authService.getUserRole()

}
