import { Component, OnInit } from '@angular/core';
import { NotificationService, Position } from '@progress/kendo-angular-notification';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  ngOnInit(): void {
 this.getUser()
  }

  getUser(){
    this.apiService.getUser().subscribe(data => {
      this.model = data
      console.log(data)
    })
  }

  constructor(
    private apiService : ApiService,
    private notificationService : NotificationService
  ){}

  model : User = new User;
  notifPos : Position = { vertical: 'top', horizontal:'center'}

  update(){
    if (this.model.password !== this.model.confirm_password) {
      this.notificationService.show({
        content: 'Passwords do not match',
        type: {style: 'warning'},
        position: this.notifPos
      });
      return;
    }

this.apiService.updateProfile(this.model).subscribe(() => {
  this.notificationService.show({
    content: 'Your profile has been updated successfully',
    type: { style:'success' },
    position: this.notifPos,
  });
  this.getUser()
})
  }

}
