import { Component, OnInit } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {


  ngOnInit(): void {
    this.apiService.getUsers().subscribe(data => {
      // this.gridData = { data: this.model.bids, total: this.model.bids.length };
    })
  }

  constructor(
    private apiService : ApiService
  ){}

  gridData :GridDataResult;
  loading = false;
  model : User = new User

}
