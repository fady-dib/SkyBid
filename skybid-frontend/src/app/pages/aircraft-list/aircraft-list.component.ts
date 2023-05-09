import { Component, ComponentRef, OnInit } from '@angular/core';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { ApiService } from 'src/app/services/api.service';
import { AddAircraftComponent } from '../add-aircraft/add-aircraft.component';
import { FileRestrictions } from '@progress/kendo-angular-upload';

@Component({
  selector: 'app-aircraft-list',
  templateUrl: './aircraft-list.component.html',
  styleUrls: ['./aircraft-list.component.css']
})
export class AircraftListComponent implements OnInit {

  ngOnInit(): void {
    this.getAicrafts()
  }

  constructor(
    private apiService: ApiService,
    private windowService: WindowService,
  ) { }

  aircrafts: any[] = []
  serverUrl = 'http://localhost:3006/'
  opened = false;
  is_loading = true;

  public imageRestrictions: FileRestrictions = {
    allowedExtensions: ['.jpg', '.png', '.jpeg']
  };


  addImage() {

  }

  getAicrafts() {
    this.apiService.getAircrafts().subscribe(data => {
      this.aircrafts = data.aircrafts
      console.log(data.aircrafts)
    })
  }

  // updateImage(aircraft_id: string, image_url: string) {
  //   const model = { aircraft_id: aircraft_id, image_url: image_url }
  //   this.apiService.deleteImage(model).subscribe(() => {
  //   });
  // }

  onFileChange(event, aircraft_id: string, aircraft) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('aircraft_id', aircraft_id);
    formData.append('image', file);
    console.log('FormData:', formData);
    if (aircraft.image) {
      this.apiService.deleteAndUpdateImage(formData).subscribe(() => {
        this.getAicrafts();
      });
    } else {
      this.apiService.uploadImage(formData).subscribe(() => {
        this.getAicrafts();
      });
    }
  }
 

  deleteAircraft(id) {
    this.apiService.deleteAircraft(id).subscribe(() => {
      this.getAicrafts()
    })
  }

  addAircraft() {
    this.opened = true
    const windowRef = this.windowService.open({
      title: "Add",
      content: AddAircraftComponent,
      width: 500,
      top: 150
    })

    let windowRefCmp: ComponentRef<AddAircraftComponent> = windowRef.content;
    windowRefCmp.instance.windowRef = windowRef

    windowRef.result.subscribe((result) => {
      if (result instanceof WindowCloseResult) {
        this.opened = false;
        this.getAicrafts()
      }
    })
  }





}
