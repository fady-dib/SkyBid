import { Component, ElementRef, OnInit, Renderer2, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import {Router} from '@angular/router';
import { SocketService } from './services/socket.service';
import { NotificationService, Position } from '@progress/kendo-angular-notification';


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


constructor(
  private socketService : SocketService,
  private notificationService : NotificationService,
){}

notifPos : Position = { vertical: 'top', horizontal:'right'}


notifications(){
  this.socketService.notifications.subscribe(data => {
    console.log('notification data',data)
    if (data && data.trim() !== '') {
      this.notificationService.show({
        content: data,
        type: { style: 'success' },
        position: this.notifPos,
      });
    }
  })
}

}


