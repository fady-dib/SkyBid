import { Component } from '@angular/core';
import { Request } from 'src/app/models/request';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent {

  model : Request = new Request();

}
