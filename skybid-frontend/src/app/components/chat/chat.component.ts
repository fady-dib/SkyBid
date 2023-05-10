import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chat } from 'src/app/models/chat';
import { ApiService } from 'src/app/services/api.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  ngOnInit(): void {
    this.getChats()
    // this.other_user_id =this.model.receiver
    this.socketService.message.subscribe( data  => {
      const array = Object.values(data)
      this.messages = array
    })
  }

  constructor(
    private apiService : ApiService,
    private socketService : SocketService
  ){}

  getChats() {
    this.apiService.getChatById(this.chat_id).subscribe((data :Chat) => {
      this.messages = data[0].messages
    })
  }
  formatTimestamp(timestamp: string) {
    return new Date(timestamp).toLocaleString([], {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  }

 
  model = {
    msg : "",
    receiver : ""
  }

other_user_id :string

@ViewChild('chatBox', { static: false })
public chatBox: ElementRef;

  ngAfterViewChecked() {        
    this.scrollToBottom();        
  } 

  scrollToBottom(): void {
    
      this.chatBox.nativeElement.scrollTop = this.chatBox.nativeElement.scrollHeight;
          
  }

  

  chat_id : string

  messages 
  

  sendMessage(){
    this.socketService.sendMessage(this.model)
    this.model.msg = ""
    this.scrollToBottom();    
  }

}
