import { Component, ComponentRef, OnInit } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { Request } from 'src/app/models/request';
import { ApiService } from 'src/app/services/api.service';
import { SocketService } from 'src/app/services/socket.service';
import { Subscription, finalize } from 'rxjs';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import {AddBidComponent } from '../add-bid/add-bid.component';



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
    private socketService: SocketService,
    private windowService : WindowService,
  ){}

  model : Request = new Request();

  request;

  gridData : GridDataResult;
  loading = false;
  request_id : string
  broker_id;
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
      const sortedBids = orderBy(this.model.bids, this.sort);
      this.gridData = { data: sortedBids, total: sortedBids.length };
    })
  }

  private sort: SortDescriptor[] = [{
    field: 'price',
    dir: 'asc'
  }];


  formatDate(date: Date): string {
    const new_date = new Date(date);
    const year = new_date.getFullYear();
    const month = String(new_date.getMonth() + 1).padStart(2, '0');
    const day = String(new_date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }
  opened = false
  
add(){
  this.opened = true ;
  const windowRef = this.windowService.open({
    title : `New Bid`,
    content: AddBidComponent,
    width :635,
    top : 100,
  });

  let windowRefCmp : ComponentRef<AddBidComponent> = windowRef.content;
  windowRefCmp.instance.request.request_id = this.model._id
    windowRefCmp.instance.request.broker_id = this.model.broker._id
    windowRefCmp.instance.windowRef = windowRef

  windowRef.result.subscribe((result) => {
    if(result instanceof WindowCloseResult) {
      this.opened =false;
      this.getBids()
    }
  })
}


}
