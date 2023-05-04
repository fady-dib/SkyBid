import { Component, OnInit } from '@angular/core';
import { CellClickEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { SortDescriptor } from '@progress/kendo-data-query';
import { Subscription, finalize } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-broker-requests',
  templateUrl: './broker-requests.component.html',
  styleUrls: ['./broker-requests.component.css']
})
export class BrokerRequestsComponent implements OnInit {

  ngOnInit(): void {
    this.search()
  }

  constructor(
    private apiService : ApiService,
  ) { }
  

  public gridData: GridDataResult;
private dataSubscription: Subscription;
sort: SortDescriptor[] = [{
  field: 'createdAt',
  dir: 'desc'
}];
loading = false;
mySelection : number[] =[];
clickedItem: Request
opened = false

private search () {
  this.loading = true
  this.apiService.getRequestsByBroker()
  .pipe(
    finalize(()=> this.loading = false)
  )
  .subscribe(data => {
    this.gridData = {
      data: data, total : data.length
    }
  })
}

cellClick(event: CellClickEvent) {

}

sortChange(sort :SortDescriptor[]){

}

onDblClick(){

}

}
