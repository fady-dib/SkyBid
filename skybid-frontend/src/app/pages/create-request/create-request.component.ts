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
    private socketService: SocketService,
    private notificationService: NotificationService,
  ) { }
  model: Request = new Request()
  notifPos: Position = { vertical: 'bottom', horizontal: 'center' }
  @ViewChild('container', { read: ViewContainerRef })
  public container: ViewContainerRef;
  windowref: WindowRef

  create() {

    let validations = []

    if (this.model.trip == null) {
      validations.push('Trip')
    }
    if (this.model.passengers == null) {
      validations.push('Passengers')
    }
    if (this.model.from == null || this.model.from.trim() == "") {
      validations.push('From')
    }
    if (this.model.to == null || this.model.to.trim() == "") {
      validations.push('To')
    }
    if (this.model.departure_date == null) {
      validations.push('Departure date')
    }
    if (this.model.return_date == null) {
      validations.push('return date')
    }
    if (this.model.luggage == null) {
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

  airports = [
    { code: 'ATL', name: 'Hartsfield-Jackson Atlanta International Airport' },
    { code: 'LAX', name: 'Los Angeles International Airport' },
    { code: 'ORD', name: 'Chicago O\'Hare International Airport' },
    { code: 'LHR', name: 'London Heathrow Airport' },
    { code: 'DXB', name: 'Dubai International Airport' },
    { code: 'HND', name: 'Tokyo Haneda Airport' },
    { code: 'CDG', name: 'Paris Charles de Gaulle Airport' },
    { code: 'AMS', name: 'Amsterdam Airport Schiphol' },
    { code: 'HKG', name: 'Hong Kong International Airport' },
    { code: 'SYD', name: 'Sydney Kingsford Smith Airport' },
    { code: 'SFO', name: 'San Francisco International Airport' },
    { code: 'YYZ', name: 'Toronto Pearson International Airport' },
    { code: 'FRA', name: 'Frankfurt am Main Airport' },
    { code: 'SIN', name: 'Singapore Changi Airport' },
    { code: 'MUC', name: 'Munich Airport' },
    { code: 'JFK', name: 'John F. Kennedy International Airport' },
    { code: 'MAD', name: 'Adolfo Suárez Madrid–Barajas Airport' },
    { code: 'IST', name: 'Istanbul Atatürk Airport' },
    { code: 'GRU', name: 'São Paulo/Guarulhos–Governador André Franco Montoro International Airport' },
    { code: 'DEL', name: 'Indira Gandhi International Airport' },
    { code: 'BEY', name: 'Beirut-Rafic Hariri International Airport' },
    { code: 'BOM', name: 'Chhatrapati Shivaji Maharaj International Airport' },
    { code: 'MIA', name: 'Miami International Airport' },
    { code: 'EZE', name: 'Ministro Pistarini International Airport' },
    { code: 'PEK', name: 'Beijing Capital International Airport' },
    { code: 'ICN', name: 'Incheon International Airport' },
    { code: 'NRT', name: 'Narita International Airport' },
    { code: 'KUL', name: 'Kuala Lumpur International Airport' },
    { code: 'MEX', name: 'Mexico City International Airport' },
    { code: 'GRU', name: 'São Paulo/Guarulhos–Governador André Franco Montoro International Airport' },
    { code: 'BKK', name: 'Suvarnabhumi Airport' },
    { code: 'CGK', name: 'Soekarno-Hatta International Airport' },
    { code: 'JNB', name: 'O. R. Tambo International Airport' },
    { code: 'SVO', name: 'Sheremetyevo International Airport' },
    { code: 'CPT', name: 'Cape Town International Airport' },
    { code: 'DME', name: 'Domodedovo International Airport' },
    { code: 'ARN', name: 'Stockholm Arlanda Airport' },
    { code: 'MEL', name: 'Melbourne Airport' },
    { code: 'AKL', name: 'Auckland Airport' },
    { code: 'ZRH', name: 'Zürich Airport' },
    { code: 'LGW', name: 'London Gatwick Airport' },
    { code: 'YYC', name: 'Calgary International Airport' },
    { code: 'GVA', name: 'Geneva Airport' },
    { code: 'CUN', name: 'Cancún International Airport' },
    { code: 'BCN', name: 'Barcelona–El Prat Airport' },
    { code: 'MAN', name: 'Manchester Airport' },
    { code: 'BRU', name: 'Brussels Airport' },
    { code: 'EDI', name: 'Edinburgh Airport' },
    { code: 'BUD', name: 'Budapest Ferenc Liszt International Airport' },
    { code: 'ATH', name: 'Athens International Airport' },
    { code: 'PVG', name: 'Shanghai Pudong International Airport' },
    { code: 'AUH', name: 'Abu Dhabi International Airport' },
    { code: 'CPH', name: 'Copenhagen Airport' },
    { code: 'OSL', name: 'Oslo Airport' },
    { code: 'HEL', name: 'Helsinki Airport' },
    { code: 'DOH', name: 'Hamad International Airport' },
    { code: 'LIS', name: 'Lisbon Portela Airport' },
    { code: 'WAW', name: 'Warsaw Chopin Airport' },
    { code: 'PRG', name: 'Václav Havel Airport Prague' },
    { code: 'TPE', name: 'Taiwan Taoyuan International Airport' }
  ]

}
