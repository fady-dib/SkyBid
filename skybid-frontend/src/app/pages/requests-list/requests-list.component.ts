import { Component, OnInit } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { finalize, tap } from 'rxjs';
import { Request } from 'src/app/models/request';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.css']
})
export class RequestsListComponent implements OnInit {

ngOnInit(): void {
  this.search()
  
}

constructor(
  private apiService : ApiService,

) { }

gridView : GridDataResult;
sort = [] ;
loading = false;


requests: Request[] = []

private search () {
  this.apiService.requests()
  .subscribe(data => {
    this.requests = data
    this.loadItems()
    console.log(this.requests)
  })
  
}

public sortChange(sort : SortDescriptor[]) : void{
  this.sort = sort;
  this.loadItems()
}

private loadItems(): void {
  this.gridView = {
    data: orderBy(this.requests, this.sort),
    total: this.requests.length
  };
}

}
