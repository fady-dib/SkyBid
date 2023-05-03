import { Component } from '@angular/core';
import { Register } from 'src/app/models/register';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {

  model : Register = new Register;

  update(){

  }

}
