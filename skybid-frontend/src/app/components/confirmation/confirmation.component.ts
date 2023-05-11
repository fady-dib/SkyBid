import { Component, OnInit } from '@angular/core';
import { WindowRef } from '@progress/kendo-angular-dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {


  ngOnInit(): void {
    this.textArea = `Bid accepted on a ${this.trip} request from ${this.from} to ${this.to} `
    this.label = `This message will be sent to ${this.operator}`
  }

  constructor(private windowRef : WindowRef) {
  }

  onClose(result) {
    this.result = result;
    this.windowRef.close();
  }

  message : string;
  result : boolean;
  from : string;
  to :string;
  trip : string;
  label : string;
  operator : string;
  textArea :string;

}
