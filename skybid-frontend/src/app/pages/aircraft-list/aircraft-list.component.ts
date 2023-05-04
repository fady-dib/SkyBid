import { Component, OnInit } from '@angular/core';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { ApiService } from 'src/app/services/api.service';
import { AddAircraftComponent } from '../add-aircraft/add-aircraft.component';

@Component({
  selector: 'app-aircraft-list',
  templateUrl: './aircraft-list.component.html',
  styleUrls: ['./aircraft-list.component.css']
})
export class AircraftListComponent implements OnInit {

  ngOnInit(): void {
    this.apiService.getAircrafts().subscribe(data => {
      this.aircrafts = data.aircrafts
      console.log(data.aircrafts)
    })
  }

  constructor(
    private apiService: ApiService,
    private windowService : WindowService,
  ){}

  aircrafts: any[] = []
  serverUrl = 'http://localhost:3006/'
  opened = false;
  is_loading = true;

  addImage(){

  }

  updateImage(){

  }

  deleteAircraft(){}

  addAircraft(){
    this.opened = true
    const windowRef = this.windowService.open({
      title: "A D D" + " " + "A I R C R A F T ",
      content : AddAircraftComponent,
      width: 400
    })

    windowRef.result.subscribe((result) => {
      if(result instanceof WindowCloseResult) {
        this.opened =false;
      }
    })
  }





}
