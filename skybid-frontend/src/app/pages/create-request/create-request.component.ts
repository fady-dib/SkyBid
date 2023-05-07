import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { NotificationService, Position } from '@progress/kendo-angular-notification';
import { Request } from 'src/app/models/request';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.css']
})
export class CreateRequestComponent {

  constructor(
    private socketService :SocketService,
    private notificationService : NotificationService,
  ){}
  model : Request = new Request()
  notifPos : Position = { vertical: 'bottom', horizontal:'center'}
  @ViewChild('container', { read: ViewContainerRef })
  public container: ViewContainerRef;
  windowref : WindowRef

  create() {

    let validations = []

    if(this.model.trip == null){
      validations.push('Trip')
    }
    if(this.model.passengers == null){
      validations.push('Passengers')
    }
    if(this.model.from == null || this.model.from.trim() == ""){
      validations.push('From')
    }
    if(this.model.to == null || this.model.to.trim() == ""){
      validations.push('To')
    }
    if(this.model.departure_date == null){
      validations.push('Departure date')
    }
    if(this.model.return_date == null){
      validations.push('return date')
    }
    if(this.model.luggage == null){
      validations.push('Luggage')
    }


    validations.forEach((value, index) => {
      let i = index + 1;
      validations[index] = i + ' : ' + value;
    });

    if (validations.length > 0) {
      this.notificationService.show({
        content: `Please fill in the following mandatory field(s):
          `+ validations.join('\n'),
        type: { style: 'warning' },
        position: this.notifPos,
        appendTo: this.container,
      });
      return;
    }

    this.socketService.createRequest(this.model)
    this.windowref.close()
  }

}
