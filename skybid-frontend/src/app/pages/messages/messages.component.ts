import { Component, ComponentRef } from '@angular/core';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { CellClickEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { NotificationService } from '@progress/kendo-angular-notification';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { Subscription, finalize } from 'rxjs';
import { ChatComponent } from 'src/app/components/chat/chat.component';
import { ApiService } from 'src/app/services/api.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {

  chats = []


  ngOnInit(): void {
    console.log('ngOnInit triggered');
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
  clickedItem
  opened = false

  private search() {
    this.loading = true
    this.apiService.getConversations()
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(data => {
        console.log(data)
        this.sortChats(data);
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
      data: orderBy(this.chats, this.sort),
      total: this.chats.length
    };
  }

  private sortChats(data: Request[]): void {
    this.chats = [...data];
    this.chats.sort((a, b) => {
      if (this.sort[0].dir === 'desc') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
    });
  }

  onDblClick(){

    if(this.clickedItem) {
      const windowRef = this.windowService.open({
        title : `Chat`,
        content: ChatComponent,
        width :635,
        top : 100,
        height: 600
      });
      let windowRefCmp : ComponentRef<ChatComponent> = windowRef.content;
       windowRefCmp.instance.chat_id = this.clickedItem._id
  
      windowRef.result.subscribe((result) => {
        if(result instanceof WindowCloseResult) {
          this.opened =false;
          this.search();
        }
      })
      this.opened = true ;
    }

  }


 



}
