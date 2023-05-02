import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

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
    private apiService: ApiService
  ){}

  aircrafts: any[] = []

  addImage(){

  }

  deleteImage(){

  }

  deleteAircraft(){}


}
