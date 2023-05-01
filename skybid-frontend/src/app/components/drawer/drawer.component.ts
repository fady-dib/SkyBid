import { Component } from '@angular/core';
import { Route, Router, Routes } from '@angular/router';
import { CustomMenuItem } from 'src/app/models/menu';
import { DrawerSelectEvent } from "@progress/kendo-angular-layout"

interface Item {
  text: string;
  icon: string;
  path: string;
  selected?: boolean;
}

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css']
})
export class DrawerComponent {
  public expanded = false;

  constructor(
    private router: Router, 
  ){}
  


  menu_items : CustomMenuItem[] = [
    {menu_id: 1, text: 'Requests', icon: 'k-i-track-changes-enable', expanded: false, selected: false, path: '/request-list'},
    {menu_id: 2, text: 'Bids', icon: 'k-i-inherited', expanded: false, selected: false, path: '/login'},
    {menu_id: 3, text: 'Messages', icon: 'k-i-inherited', expanded: false, selected: false, path: '/register'},
    {menu_id: 4, text: 'Fleet', icon: 'k-i-inherited', expanded: false, selected: false, path: '.'}
  ]

  public selectedMenuItem: any = {};
  
}
