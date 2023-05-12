import { Component, ComponentRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { WindowCloseResult, WindowRef, WindowService } from '@progress/kendo-angular-dialog';
import { CellClickEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { NotificationService } from '@progress/kendo-angular-notification';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { BehaviorSubject, finalize } from 'rxjs';
import { AgreementComponent } from 'src/app/components/agreement/agreement.component';
import { CommentComponent } from 'src/app/components/comment/comment.component';
import { ConfirmationComponent } from 'src/app/components/confirmation/confirmation.component';
import { ApiService } from 'src/app/services/api.service';
import { SocketService } from 'src/app/services/socket.service';
import { CommonModule, DecimalPipe, NumberFormatStyle } from '@angular/common';

@Component({
  selector: 'app-bids',
  templateUrl: './bids.component.html',
  styleUrls: ['./bids.component.css'],
})
export class BidsComponent implements OnInit {
  ngOnInit(): void {
    this.getBids();
  }

  constructor(
    private apiService: ApiService,
    private windowService: WindowService,
    private notificationService : NotificationService,
    private socketService : SocketService,
    private decimalPipe: DecimalPipe
  ) { }

  dialog_title: string;
  @ViewChild('windowTitleBar', { read: TemplateRef, static: false })
  public windowTitleBar: TemplateRef<any>;
  windowRef : WindowRef;
  data : { from : string, to:string, trip: string,bids:[{operator : {company_name : string, _id:string}}]}
  loading : boolean = false;
  mySelection: number[] = [];
  clickedItem: Request;
  gridData: GridDataResult;
  bids : any[];
  request_id : string;
  sort: SortDescriptor[] = [
    {
      field: 'createdAt',
      dir: 'desc',
    },
  ];
  opened : boolean = false

  get selectedDataItem() {
    if (this.mySelection.length > 0)
      return this.bids.find(c => c._id == this.mySelection[0])
    else
      return null;
  }

  getBids() {
    this.loading = true;
    this.apiService
      .getRequestbyId(this.request_id)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((data) => {
        this.data = data
        this.sortBids(data.bids);
        this.loadItems();
      });
  }


  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.loadItems();
  }

  private loadItems(): void {
    this.gridData = {
      data: orderBy(this.bids, this.sort),
      total: this.bids.length,
    };
  }

  cellClick(event: CellClickEvent) {
    this.mySelection = [event.dataItem._id];

    this.clickedItem = event.dataItem;
    setTimeout(() => {
      this.clickedItem = null;
    }, 300);
  }

  private sortBids(data: Request[]): void {
    this.bids = [...data];
    this.bids.sort((a, b) => {
      if (this.sort[0].dir === 'desc') {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      }
    });
  }
  

  accept() {
    if (!this.selectedDataItem) {
      this.notificationService.show({
        content: 'Select a bid',
        type: { style: 'warning' }
      })
      return;
    }
    this.opened = true;
    this.dialog_title = 'Confirmation';
  
    const confirmDialog = this.windowService.open({
      content: ConfirmationComponent,
      top: window.innerHeight / 2 - 150,
      height: 400,
      width: 510,
      titleBarContent: this.windowTitleBar,
    });
  
    let confirmation_text = `Are you sure you want to accept this bid: USD ${this.decimalPipe.transform(this.selectedDataItem.price)}`
  
    let model ={msg : "", receiver : this.data.bids[0].operator._id}
  
    let confirmDialogCmp: ComponentRef<ConfirmationComponent> = confirmDialog.content;
    confirmDialogCmp.instance.message = confirmation_text
    confirmDialogCmp.instance.from = this.data.from
    confirmDialogCmp.instance.to = this.data.to
    confirmDialogCmp.instance.trip = this.data.trip
    confirmDialogCmp.instance.operator = this.data.bids[0].operator.company_name
  
    confirmDialogCmp.instance.messageEvent.subscribe((message) => {
      model.msg = message;
    });
  
    confirmDialog.result.subscribe(() => {
      this.opened = true
      if (confirmDialogCmp.instance.result) {
        this.loading = true
        this.apiService.acceptBid(this.request_id).pipe(finalize(() => (this.loading = false)))
          .subscribe(data => {
            if (data.message == "Request closed") {
              this.windowRef.close()
              this.socketService.sendMessage(model)
              this.notificationService.show({
                content: 'Message sent successfully',
                type: { style: 'success' }
              })
              this.getBids()
            }
          })
      }
      this.opened = false
    });
  }



  addComment(){
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
    windowRefCmp.instance.model.receiver = this.selectedDataItem.operator._id
    windowRefCmp.instance.windowRef = windowRef
    windowRefCmp.instance.to = this.selectedDataItem.operator.company_name

    windowRef.result.subscribe((result) => {
      if (result instanceof WindowCloseResult) {
        this.opened = false;
      }
    })
  }


}


