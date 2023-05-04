import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListItemModel } from '@progress/kendo-angular-buttons';
import { AuthService } from 'src/app/auth/auth.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  constructor(
    private socketService : SocketService,
    private authService : AuthService,
    private router : Router
  ){}

  ngOnInit(): void {
    this.getNotification()
  }

  user_role = this.authService.getUserRole()
  notifications : string[] = ['jhjjgjhgjgjkgjkgjghjkgjghgjg'];
  notificationData : ListItemModel [] =[{text: 'Notifications'}]
  userData = [
    { text: 'Edit Profile', action: 'editProfile' },
    { text: 'Logout', action: 'logout' }
  ];

  onItemClick(event){
    const action = event.item.action;
    switch (action) {
      case 'logout':
        this.authService.logout();
        break;
      case 'editProfile':
        this.router.navigate(['/edit-profile']);
        break;
      default:
        break;
    }
  }

 

  private getNotification() {
    console.log('getNotification called')
    this.socketService.notifications.subscribe(notification => {
      // if(!notification){
      // // this.notifications.push(notification)}
      // // console.log(notification)
      console.log(this.notifications)
      if(!notification){
      this.notificationData.push({text: notification})};
    })
  }
}
