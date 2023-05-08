import { Component } from '@angular/core';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-aircraft',
  templateUrl: './add-aircraft.component.html',
  styleUrls: ['./add-aircraft.component.css']
})
export class AddAircraftComponent {

  model = {
    aircraft : "",
    passengers :0,
    year:0
  }

  constructor(
    private apiService : ApiService
  ){
  }


  windowRef : WindowRef

  add(){
    this.apiService.addAircraft(this.model).subscribe(() => {
      this.windowRef.close()
    })
  }

}
