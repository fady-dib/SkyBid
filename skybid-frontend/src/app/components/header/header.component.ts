import { Component, OnInit } from '@angular/core';
import { ListItemModel } from '@progress/kendo-angular-buttons';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  constructor(
    private socketService : SocketService,
  ){}

  ngOnInit(): void {
    this.getNotification()
  }
  notifications : string[] = ['jhjjgjhgjgjkgjkgjghjkgjghgjg'];
  notificationData : ListItemModel [] =[{text: 'Notifications'}]
  userData: ListItemModel [] =[]

 

  private getNotification() {
    console.log('getNotification called')
    this.socketService.notifications.subscribe(notification => {
      if(!notification){
      this.notifications.push(notification)}
      console.log(notification)
      console.log(this.notifications)
      this.notificationData.push({text: notification});
    })
  }
}
