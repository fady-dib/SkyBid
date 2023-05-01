import { Component, OnInit } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy, process } from '@progress/kendo-data-query';
import { Subscription, finalize, tap } from 'rxjs';
import { Request } from 'src/app/models/request';
import { ApiService } from 'src/app/services/api.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.css']
})
export class RequestsListComponent implements OnInit {

ngOnInit(): void {
  this.search()

  this.dataSubscription = this.socketService.requests.subscribe(data => {
    this.updateRequests(data);
    this.loadItems();

  })
  
}

constructor(
  private apiService : ApiService,
  private socketService : SocketService,

) { }

public gridData: GridDataResult;
private dataSubscription: Subscription;
sort: SortDescriptor[] = [{
  field: 'createdAt',
  dir: 'desc'
}];
loading = false;


requests: Request[] = []

private search () {
  this.loading = true
  this.apiService.requests()
  .pipe(
    finalize(()=> this.loading = false)
  )
  .subscribe(data => {
    this.updateRequests(data);
    this.loadItems()
    console.log(this.requests)
  })
  
}

public sortChange(sort : SortDescriptor[]) : void{
  this.sort = sort;
  this.loadItems()
}

private loadItems(): void {
  this.gridData = {
    data: orderBy(this.requests, this.sort),
    total: this.requests.length
  };
}

private updateRequests(data: Request[]): void {
  this.requests = [...data];
  this.requests.sort((a, b) => {
    if (this.sort[0].dir === 'desc') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
  });
}

}
