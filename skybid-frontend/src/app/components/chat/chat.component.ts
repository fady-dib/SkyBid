import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  ngOnInit(): void {

  }

  constructor(
    private apiService : ApiService
  ){}

  other_user_id : string;
  model ={
    message : ""
  }

  chat_id : string

  messages

  sendMessage(){

  }

}
