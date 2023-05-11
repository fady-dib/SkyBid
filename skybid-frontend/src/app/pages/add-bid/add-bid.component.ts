import { Component, Input, OnInit } from '@angular/core';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { NotificationService } from '@progress/kendo-angular-notification';
import { ApiService } from 'src/app/services/api.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-add-bid',
  templateUrl: './add-bid.component.html',
  styleUrls: ['./add-bid.component.css']
})
export class AddBidComponent implements OnInit {

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
request={
  request_id:"",
  broker_id:""
}

windowRef : WindowRef

  constructor(
    private apiService : ApiService,
    private socketService : SocketService,
    private notificationService : NotificationService
   
  ){}

  lowest_bid : number

  model = {
    aircraft: '',
    price: null
  }
  add(){
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
