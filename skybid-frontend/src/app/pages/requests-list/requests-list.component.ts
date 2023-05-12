import { Component, ComponentRef, OnInit } from '@angular/core';
import { CellClickEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy, process } from '@progress/kendo-data-query';
import { Subscription, finalize, tap } from 'rxjs';
import { Request } from 'src/app/models/request';
import { ApiService } from 'src/app/services/api.service';
import { SocketService } from 'src/app/services/socket.service';
import { RequestDetailComponent } from '../request-detail/request-detail.component';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NotificationService } from '@progress/kendo-angular-notification';
import { CommentComponent } from 'src/app/components/comment/comment.component';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.css'],
  animations: [
    trigger('newDataHighlight', [
      state('new', style({ backgroundColor: ' rgba(8, 154, 130,0.6)' })),
      state('old', style({ backgroundColor: '*' })),
      transition('new => old', animate('1000ms ease-out')),
    ]),
  ],
})
export class RequestsListComponent implements OnInit {

ngOnInit(): void {

  this.dataSubscription = this.socketService.requests.subscribe(data => {
    let newRequests: any[] = [];

    if (data && this.requests && data.length < this.requests.length) {
      this.requests = data;
      this.sortRequests(this.requests);
      this.loadItems();
      return;
    }
  
    data.forEach(newData => {
      const newDataTimestamp = new Date(newData.createdAt).getTime();
      if (newDataTimestamp > this.latestRequestTimestamp) {
        newData.isNew = true;
        this.latestRequestTimestamp = newDataTimestamp;
        newRequests.push(newData);
      }
    });
  
    this.requests = [...this.requests, ...newRequests];
    this.sortRequests(this.requests);
    this.loadItems();

    setTimeout(() => {
      this.requests = this.requests.map((item) => {
        if (item.isNew) {
          return { ...item, isNew: false };
        }
        return item;
      });
      this.loadItems();
    }, 5000);

  })
  this.search()
}

constructor(
  private apiService : ApiService,
  private socketService : SocketService,
  private windowService : WindowService,
  private notificationService : NotificationService
) { }


get selectedDataItem() {
  if (this.mySelection.length > 0)
    return this.requests.find(c => c._id == this.mySelection[0])
  else
    return null;
}

public gridData: GridDataResult;
private dataSubscription: Subscription;
sort: SortDescriptor[] = [{
  field: 'createdAt',
  dir: 'desc'
}];
loading : boolean = false;
mySelection : number[] =[];
clickedItem: Request
opened : boolean = false


requests : any[]=[]

private search () {
  this.loading = true
  this.apiService.requests()
  .pipe(
    finalize(()=> this.loading = false)
  )
  .subscribe(data => {
    this.sortRequests(data);
    this.loadItems()
  })
  
}
onDblClick() {
  if(this.clickedItem) {
    const windowRef = this.windowService.open({
      title : `REQUEST DETAILS`,
      content: RequestDetailComponent,
      width :660,
      top : 100
    });
    let windowRefCmp : ComponentRef<RequestDetailComponent> = windowRef.content;
    windowRefCmp.instance.request_id = this.clickedItem._id

    windowRef.result.subscribe((result) => {
      if(result instanceof WindowCloseResult) {
        this.opened =false;
        this.search();
      }
    })
    this.opened = true ;
  }
}

cellClick(event : CellClickEvent){
this.mySelection = [event.dataItem._id]

this.clickedItem = event.dataItem;
setTimeout(() => {
  this.clickedItem = null
}, 300)
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

private sortRequests(data: Request[]): void {
  this.requests = [...data];
  this.requests.sort((a, b) => {
    if (this.sort[0].dir === 'desc') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
  });
  this.latestRequestTimestamp = this.requests[0]?.createdAt ? new Date(this.requests[0].createdAt).getTime() : 0;
}

private latestRequestTimestamp: number = 0;

sendMessage(){
  if (!this.selectedDataItem) {
    this.notificationService.show({
      content: 'Select a bid',
      type: { style: 'warning' }
    })
    return;
  }
  this.opened = true
  const windowRef = this.windowService.open({
    title: "Message",
    content: CommentComponent,
    width: 500,
    top: 150
  })

  let windowRefCmp: ComponentRef<CommentComponent> = windowRef.content;
  windowRefCmp.instance.model.receiver = this.selectedDataItem.broker._id
  windowRefCmp.instance.windowRef = windowRef
  windowRefCmp.instance.to = this.selectedDataItem.broker.company_name

  windowRef.result.subscribe((result) => {
    if (result instanceof WindowCloseResult) {
      this.opened = false;
    }
  })
}
}
