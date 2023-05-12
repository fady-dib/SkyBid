import { Component, Input, OnInit } from '@angular/core';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { NotificationService } from '@progress/kendo-angular-notification';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit {

  ngOnInit(): void {
  if(!this.label){
    this.label = `Send message to ${this.to}`
  }
  }

  constructor(
    private socketService : SocketService,
    private notificationService : NotificationService
  ) {}

  model = {
    msg : "",
    receiver : ""
  }
  to : string
  windowRef : WindowRef
  @Input() button = true
  @Input() readonly = false
  @Input() placeholder : string = "Type your message"
  @Input() label : string 
  @Input() class : boolean = true


  send(){
    this.socketService.sendMessage(this.model)
      this.windowRef.close()
      this.notificationService.show({
        content: 'Message sent successfully',
        type: { style: 'success' }
      })
    }

}
