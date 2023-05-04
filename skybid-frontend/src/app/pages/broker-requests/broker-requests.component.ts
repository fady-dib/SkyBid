import { Component, OnInit } from '@angular/core';
import { CellClickEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { SortDescriptor } from '@progress/kendo-data-query';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-broker-requests',
  templateUrl: './broker-requests.component.html',
  styleUrls: ['./broker-requests.component.css']
})
export class BrokerRequestsComponent implements OnInit {

  ngOnInit(): void {
    
  }

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

cellClick(event: CellClickEvent) {

}

sortChange(sort :SortDescriptor[]){

}

onDblClick(){
  
}

}
