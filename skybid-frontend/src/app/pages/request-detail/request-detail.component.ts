import { Component, OnInit } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { Request } from 'src/app/models/request';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {

  ngOnInit(): void {
    this.apiService.getRequestbyId(this.request_id)
    .subscribe(data => {
      data.departure_date = this.formatDate(data.departure_date);
      data.return_date = this.formatDate(data.return_date);
      this.model = data
      console.log(this.model)
    })
  }

  constructor(
    private apiService : ApiService,
  ){}

  model : Request = new Request();

  gridData : GridDataResult;
  sort = [] ;
  loading = false;
  request_id : string

  formatDate(date: Date): string {
    const new_date = new Date(date);
    const year = new_date.getFullYear();
    const month = String(new_date.getMonth() + 1).padStart(2, '0');
    const day = String(new_date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }

}
