import { Component, OnInit } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { finalize } from 'rxjs';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {


  ngOnInit(): void {
    this.loading = true
    this.apiService.getUsers().pipe(finalize(()=> this.loading = false)).subscribe(data => {
       this.gridData = {  data: data, total: data.length };
    })
  }

  constructor(
    private apiService : ApiService
  ){}

  gridData :GridDataResult;
  loading = false;

}
