import { Component, OnInit } from '@angular/core';
import { CellClickEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { finalize } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-bids',
  templateUrl: './bids.component.html',
  styleUrls: ['./bids.component.css']
})
export class BidsComponent implements OnInit {

  ngOnInit(): void {

  }

  constructor(
    private apiService: ApiService,
  ) { }

  getBids() {
    this.loading = true;
    this.apiService.getRequestbyId(this.request_id)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(data => {

      })
  }

  loading;
  mySelection: number[] = [];
  clickedItem: Request
  gridData: GridDataResult
  bids
  request_id
  sort: SortDescriptor[] = [{
    field: 'createdAt',
    dir: 'desc'
  }];


  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.loadItems()
  }



  private loadItems(): void {
    this.gridData = {
      data: orderBy(this.bids, this.sort),
      total: this.bids.length
    };
  }

  cellClick(event: CellClickEvent) {
    this.mySelection = [event.dataItem._id]

    this.clickedItem = event.dataItem;
    setTimeout(() => {
      this.clickedItem = null
    }, 300)
  }


  private sortRequests(data: Request[]): void {
    this.bids = [...data];
    this.bids.sort((a, b) => {
      if (this.sort[0].dir === 'desc') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
    });
  }

  accept() {

  }

}
