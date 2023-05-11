import { Component, Input } from '@angular/core';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { NotificationService } from '@progress/kendo-angular-notification';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {

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

  send(){
    this.socketService.sendMessage(this.model)
      this.windowRef.close()
      this.notificationService.show({
        content: 'Message sent successfully',
        type: { style: 'success' }
      })
    }

}
