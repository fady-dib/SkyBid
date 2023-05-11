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

  numbers = [
    { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 },
    { value: 6 }, { value: 7 }, { value: 8 }, { value: 9 }, { value: 10 },
    { value: 11 }, { value: 12 }, { value: 13 }, { value: 14 }, { value: 15 },
    { value: 16 }, { value: 17 }, { value: 18 }, { value: 19 }, { value: 20 },
    { value: 21 }, { value: 22 }, { value: 23 }, { value: 24 }, { value: 25 },
    { value: 26 }, { value: 27 }, { value: 28 }, { value: 29 }, { value: 30 }
  ];

}
