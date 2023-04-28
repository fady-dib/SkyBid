import { Component } from '@angular/core';
import { SocketService } from '../../socket.service';

@Component({
  selector: 'app-chat-component',
  templateUrl: './chat-component.component.html',
  styleUrls: ['./chat-component.component.css']
})
export class ChatComponentComponent {

  

  constructor(private socketService: SocketService){

  }

  new_message: string = "";
  messageList: string[] = [];

  ngOnInit(){
    this.socketService.getNewMessage().subscribe((message: string) => {
      this.messageList.push(message);
    })
  }

  sendMessage() {
    this.socketService.sendMessage(this.new_message);
    this.new_message = '';
  }
}

