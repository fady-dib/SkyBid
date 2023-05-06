import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.css']
})
export class BidComponent implements OnInit {

  aircrafts: any;
  formValues: any = {
    aircraft: '',
    passengers: '',
    yearOfManufacture: ''
  };

  ngOnInit(): void {
    this.apiService.getAircrafts().subscribe(data => {
      console.log(data);
      this.aircrafts = data.aircrafts;
    });
  }

  request_id;
  broker_id;

  constructor(
    private apiService : ApiService,
   
  ){}

  model = {
    aircraft: '',
    price: ''
  }
  add(){
 

  }

}
