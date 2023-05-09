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
    // this.getNotification()
    this.setUserData()
  }

  user_role = this.authService.getUserRole()

  notifications : string[] = ['jhjjgjhgjgjkgjkgjghjkgjghgjg'];
  notificationData : ListItemModel [] =[{text: 'Notifications'}]

  userData = []

  onItemClick(event){
    const action = event.action;
    switch (action) {
      case 'logout':
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        console.log('disconecting socket from logout')
        this.socketService.disconnect()
        this.router.navigate(['/login'] );
        break;
      case 'editProfile':
        this.router.navigate(['/edit-profile']);
        break;
    }
  }

  setUserData() {
    this.userData = [
      { text: 'Edit Profile',icon:'track-changes-enable', action: 'editProfile' },
      { text: 'Logout', icon:'logout', action: 'logout' },
    ];

    if (this.user_role === 'admin') {
      this.userData = this.userData.filter((item) => item.action !== 'editProfile');
    }
  }


 

//   private getNotification() {
//     console.log('getNotification called')
//     this.socketService.notifications.subscribe(notification => {
//       // if(!notification){
//       // // this.notifications.push(notification)}
//       // // console.log(notification)
//       console.log(this.notifications)
//       if(!notification){
//       this.notificationData.push({text: notification})};
//     })
//   }
}
