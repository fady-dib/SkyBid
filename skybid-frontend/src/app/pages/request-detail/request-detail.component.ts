import { Component, OnInit } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { Request } from 'src/app/models/request';
import { ApiService } from 'src/app/services/api.service';
import { SocketService } from 'src/app/services/socket.service';
import { Subscription, finalize } from 'rxjs';
import { orderBy } from '@progress/kendo-data-query';



@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {

  ngOnInit(): void {
    this.getBids()
  }

  constructor(
    private apiService : ApiService,
    private socketService: SocketService
  ){}

  model : Request = new Request();

  request;

  gridData : GridDataResult;
  sort = [] ;
  loading = false;
  request_id : string
  private subscription : Subscription

  getBids() {
    this.loading = true
    this.apiService.getRequestbyId(this.request_id)
    .pipe(
      finalize(()=> this.loading = false)
    )
    .subscribe(data => {
      data.departure_date = this.formatDate(data.departure_date);
      data.return_date = this.formatDate(data.return_date);
      this.model = data
      console.log(this.model)
      // this.model.bids.sort((a, b) => a.price - b.price);
      this.gridData = { data: this.model.bids, total: this.model.bids.length };
    })
  }


  formatDate(date: Date): string {
    const new_date = new Date(date);
    const year = new_date.getFullYear();
    const month = String(new_date.getMonth() + 1).padStart(2, '0');
    const day = String(new_date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }

  



}
