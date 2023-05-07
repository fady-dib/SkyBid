import { Component, ComponentRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { WindowService } from '@progress/kendo-angular-dialog';
import { CellClickEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { finalize } from 'rxjs';
import { ConfirmationComponent } from 'src/app/components/confirmation/confirmation.component';
import { ApiService } from 'src/app/services/api.service';

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
    private windowService: WindowService
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
  opened = false;

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

  accept() {
    this.opened = true;
    this.dialog_title = 'Confirmation';

    const confirmDialog = this.windowService.open({
      content: ConfirmationComponent,
      top: window.innerHeight / 2 - 150,
      height: 200,
      titleBarContent: this.windowTitleBar,
    });

    let confirmation_text = `Are you sure you want to accept the bid ${this.selectedDataItem.price}`


    let confirmDialogCmp : ComponentRef<ConfirmationComponent> = confirmDialog.content;
    confirmDialogCmp.instance.message = confirmation_text

  }

  get selectedDataItem(){
    if (this.mySelection.length > 0)
      return this.bids.find(c => c._id == this.mySelection[0])
    else
      return null;
  }


}


