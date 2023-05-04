import { Component } from '@angular/core';
import { Request } from 'src/app/models/request';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.css']
})
export class CreateRequestComponent {

  constructor(
    private socketService :SocketService
  ){}
  model : Request = new Request()

  create() {
    this.socketService.createRequest(this.model)
    this.model = new Request()
  }

}
