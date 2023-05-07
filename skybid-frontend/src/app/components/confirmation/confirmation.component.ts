import { Component } from '@angular/core';
import { WindowRef } from '@progress/kendo-angular-dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent {

  constructor(private windowRef : WindowRef) {
  }

  onClose(result) {
    this.result = result;
    this.windowRef.close();
  }

  message : string
  result : boolean

}
