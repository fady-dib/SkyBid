import { Component, ComponentRef, OnInit } from '@angular/core';
import { CellClickEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { Subscription, finalize } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { CreateRequestComponent } from '../create-request/create-request.component';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { Request } from 'src/app/models/request';
import { NotificationService } from '@progress/kendo-angular-notification';
import { BidsComponent } from '../bids/bids.component';
import { SocketService } from 'src/app/services/socket.service';

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
    private notificationService : NotificationService,
    private socketService : SocketService
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
        this.sortRequests(data);
        this.loadItems()
      })
  }

  cellClick(event: CellClickEvent) {
    this.mySelection = [event.dataItem._id]

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

  private sortRequests(data: Request[]): void {
    this.requests = [...data];
    this.requests.sort((a, b) => {
      if (this.sort[0].dir === 'desc') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
    });
  }


  onDblClick() {
    if(this.clickedItem) {
      const windowRef = this.windowService.open({
        title : `Bids`,
        content: BidsComponent,
        width :720,
        top : 100
      });
      let windowRefCmp : ComponentRef<BidsComponent> = windowRef.content;
      windowRefCmp.instance.request_id = this.clickedItem._id
      windowRefCmp.instance.windowRef = windowRef
  
      windowRef.result.subscribe((result) => {
        if(result instanceof WindowCloseResult) {
          this.opened =false;
          this.search();
        }
      })
      this.opened = true ;
    }
  }

  onDelete() {

    if(!this.mySelection){
      this.notificationService.show({
          content: 'Select a request',
          type: { style: 'warning' }
        });
        return;
      }
    
    this.socketService.deleteRequest(this.mySelection[0])
        this.notificationService.show({
          content: 'Request deleted succesfully',
          type: { style: 'success' }
        });
        this.mySelection = []
        this.search()
}

  onAdd() {
    this.opened = true
    const windowRef = this.windowService.open({
      title: `CREATE REQUEST`,
      content: CreateRequestComponent,
      width: 635,
      top: 100
    });

    let windowRefCmp : ComponentRef<CreateRequestComponent> = windowRef.content
    windowRefCmp.instance.windowref = windowRef
    windowRef.result.subscribe((result) => {
      if (result instanceof WindowCloseResult) {
        this.opened = false;
        this.search()
      }
    })
  }

}
