import { Component } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {

  selectedPage: string = 'request-list';

selectPage(page: string): void {
  this.selectedPage = page;
}

}
