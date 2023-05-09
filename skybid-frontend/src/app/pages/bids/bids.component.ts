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
    private socketService : SocketService
  ) { }

  getBids() {
    this.loading = true;
    this.apiService
      .getRequestbyId(this.request_id)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((data) => {
        this.sortBids(data.bids);
        this.loadItems();
      });
  }

  loading;
  mySelection: number[] = [];
  clickedItem: Request;
  gridData: GridDataResult;
  bids;
  request_id;
  sort: SortDescriptor[] = [
    {
      field: 'createdAt',
      dir: 'desc',
    },
  ];
  opened = false

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

  dialog_title: string;
  @ViewChild('windowTitleBar', { read: TemplateRef, static: false })
  public windowTitleBar: TemplateRef<any>;
  windowRef : WindowRef

  accept() {
    if (!this.selectedDataItem) {
      this.notificationService.show({
        content: 'Select a bid',
        type: { style: 'warning' }
      })
      return;
    }
    this.opened =true;
    this.dialog_title = 'Confirmation';

    const confirmDialog = this.windowService.open({
      content: ConfirmationComponent,
      top: window.innerHeight / 2 - 150,
      height: 200,
      titleBarContent: this.windowTitleBar,
    });

    let confirmation_text = `Are you sure you want to accept the bid ${this.selectedDataItem.price}`


    let confirmDialogCmp: ComponentRef<ConfirmationComponent> = confirmDialog.content;
    confirmDialogCmp.instance.message = confirmation_text
  
    confirmDialog.result.subscribe(() => {
      this.opened =true
      if (confirmDialogCmp.instance.result) {
        this.loading = true
        this.apiService.acceptBid(this.request_id).pipe(finalize(() => (this.loading = false)))
        .subscribe(data => {
          if (data.message == "Request closed") {
            this.windowRef.close()
            this.opened=true
            console.log(this.opened) ;
            const windowRef = this.windowService.open({
              title : 'Congratulations',
              content : AgreementComponent,
              width : 635,
            })
            let windowRefCmp : ComponentRef<AgreementComponent> = windowRef.content;
            windowRefCmp.instance.model = this.selectedDataItem.operator
            console.log(this.selectedDataItem)

            windowRef.result.subscribe((result) => {
              if(result instanceof WindowCloseResult) {
                this.opened = false;
                this.getBids();
              }
              
            })
           
          }

          
        })
      }
      this.opened = false
    })
    
  }

  get selectedDataItem() {
    if (this.mySelection.length > 0)
      return this.bids.find(c => c._id == this.mySelection[0])
    else
      return null;
  }

  addComment(){
    this.opened = true
    const windowRef = this.windowService.open({
      title: "Add",
      content: CommentComponent,
      width: 500,
      top: 150
    })

    let windowRefCmp: ComponentRef<CommentComponent> = windowRef.content;

    windowRef.result.subscribe((result) => {
      if (result instanceof WindowCloseResult) {
        this.opened = false;
      }
    })
  }


}


