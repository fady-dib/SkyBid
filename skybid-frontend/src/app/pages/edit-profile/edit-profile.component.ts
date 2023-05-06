import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  ngOnInit(): void {
    this.apiService.getUser().subscribe(data => {
      this.model = data
      console.log(data)
    })
  }

  constructor(
    private apiService : ApiService
  ){}

  model : User = new User;

  update(){

  }

}
