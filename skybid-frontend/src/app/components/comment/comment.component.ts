import { Component, Input, OnInit } from '@angular/core';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { NotificationService } from '@progress/kendo-angular-notification';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

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

  windowRef : WindowRef
  @Input() button = true

  @Input() readonly = false
  @Input() placeholder : string = "Type your message"
  to : string
  @Input() label : string 
  @Input() class : boolean = true
  // ngOnChanges(): void {
  //   if (!this.label) {
  //     this.label = `Send message to ${this.to}`;
  //   }
  // }

  send(){
    this.socketService.sendMessage(this.model)
      this.windowRef.close()
      this.notificationService.show({
        content: 'Message sent successfully',
        type: { style: 'success' }
      })
    }

}
