import { Component } from '@angular/core';
import { Request } from 'src/app/models/request';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.css']
})
export class CreateRequestComponent {

  model : Request = new Request()

  create() {
    
  }

}
