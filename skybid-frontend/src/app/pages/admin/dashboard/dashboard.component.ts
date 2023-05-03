import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private apiService : ApiService
  ){}

  seriesData: any[] = [];
 
  public integerFormat: string = '{0:n0}';
 
  ngOnInit(): void {
      this.apiService.getUsers().subscribe((data) => {
        this.seriesData = data.map((item) => {
          return { ...item, number: 1 ,category: this.getCategoryLabel(item.role)};
        });
      console.log(data)
   })
  }
  getCategoryLabel(role: string): string {
    if (role === 'broker')  return 'Brokers';
     else return 'Operators';
  
  }


 }
