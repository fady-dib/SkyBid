import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  ngOnInit(): void {
    this.apiService.getUsers().subscribe(data => {
this.data = data
      console.log(data)
   })
  }

  constructor(
    private apiService : ApiService
  ){}

  data : User = new User
  seriesData: [] =[]

}
