import { Component, Input, OnInit } from '@angular/core';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Aircraft } from 'src/app/models/aircraft';
import { ApiService } from 'src/app/services/api.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-add-bid',
  templateUrl: './add-bid.component.html',
  styleUrls: ['./add-bid.component.css']
})
export class AddBidComponent implements OnInit {

  aircrafts : Aircraft [];
  formValues: any = {
    aircraft: '',
    passengers: '',
    yearOfManufacture: ''
  };
  lowest_bid : number;
  request={
    request_id:"",
    broker_id:""
  }
  windowRef : WindowRef;

  model = {
    aircraft: '',
    price: null
  }

  ngOnInit(): void {
    this.apiService.getAircrafts().subscribe(data => {
      console.log(data);
      this.aircrafts = data.aircrafts;
    });
  }

  constructor(
    private apiService : ApiService,
    private socketService : SocketService,
    private notificationService : NotificationService
   
  ){}

  add(){
    console.log(this.lowest_bid, this.model.price)
    if (this.lowest_bid && this.model.price >= this.lowest_bid) {
      this.notificationService.show({
        content: 'Your bid cannot be higher or equal the lowest bid',
        type: { style: 'warning' }
      })
      return;
    }
 this.socketService.addBid(this.model,this.request)
 this.windowRef.close()

  }

}
