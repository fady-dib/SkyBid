import { Component, ElementRef, OnInit, Renderer2, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import {Router} from '@angular/router';
import { SocketService } from './services/socket.service';
import { NotificationService, Position } from '@progress/kendo-angular-notification';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
title = 'SkyBid';

ngOnInit(): void {
  this.notifications();
}
// ngOnDestroy(): void {
//   console.log('AppComponent destroyed');
//   if (this.notificationsSubscription) {
//     this.notificationsSubscription.unsubscribe();
//   }
// }
private notificationsSubscription: Subscription;
constructor(
  private socketService : SocketService,
  private notificationService : NotificationService,
){}

notifPos : Position = { vertical: 'top', horizontal:'center'}


notifications() {
  this.notificationsSubscription = this.socketService.notifications.subscribe(data => {


     if (localStorage.getItem('token') && !window.location.pathname.startsWith('/login') && !window.location.pathname.startsWith('/register') && !window.location.pathname.startsWith('/landing')) {
      console.log(window.location.pathname)
      if (!data || data.trim() === '') {
        return;
      }
      if(data == 'A request has been deleted'){
        this.notificationService.show({
          content: data,
          type: { style:'error' },
          position: this.notifPos,
        });
        return
      }
      this.notificationService.show({
        content: data,
        type: { style: 'success' },
        position: this.notifPos,
      });
   }
  });
}


}


