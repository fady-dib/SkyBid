import { Component, OnInit } from '@angular/core';
import { CellClickEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { Subscription, finalize } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { CreateRequestComponent } from '../create-request/create-request.component';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';

@Component({
  selector: 'app-broker-requests',
  templateUrl: './broker-requests.component.html',
  styleUrls: ['./broker-requests.component.css']
})


export class BrokerRequestsComponent implements OnInit {

  requests = []


  ngOnInit(): void {
    this.search()
  }

  constructor(
    private apiService: ApiService,
    private windowService: WindowService,
  ) { }


  public gridData: GridDataResult;
  private dataSubscription: Subscription;
  
  sort: SortDescriptor[] = [{
    field: 'createdAt',
    dir: 'desc'
  }];

  loading = false;
  mySelection: number[] = [];
  clickedItem: Request
  opened = false

  private search() {
    this.loading = true
    this.apiService.getRequestsByBroker()
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(data => {
        console.log(data)
        this.requests = data
        this.loadItems()
      })
  }

  cellClick(event: CellClickEvent) {
    this.mySelection = event.dataItem._id

    this.clickedItem = event.dataItem;
    setTimeout(() => {
      this.clickedItem = null
    }, 300)
  }

  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.loadItems()
  }

  private loadItems(): void {
    this.gridData = {
      data: orderBy(this.requests, this.sort),
      total: this.requests.length
    };
  }

  onDblClick() {

  }


  onDelete() {

  }

  onAdd() {
    this.opened = true
    const windowRef = this.windowService.open({
      title: `CREATE REQUEST`,
      content: CreateRequestComponent,
      width: 635,
      top: 100
    });
    windowRef.result.subscribe((result) => {
      if (result instanceof WindowCloseResult) {
        this.opened = false;
      }
    })
  }

}
