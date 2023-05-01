import { Component, OnInit } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { Request } from 'src/app/models/request';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {

  ngOnInit(): void {
    
  }

  constructor(){}

  model : Request = new Request();

  gridData : GridDataResult;
  sort = [] ;
  loading = false;

}
