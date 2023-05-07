import { Component, OnInit } from '@angular/core';
import { WindowRef } from '@progress/kendo-angular-dialog';
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
    private socketService : SocketService
   
  ){}

  model = {
    aircraft: '',
    price: ''
  }
  add(){
 this.socketService.addBid(this.model,this.request)
 this.windowRef.close()

  }

}
