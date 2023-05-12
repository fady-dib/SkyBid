import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/models/login';
import { ApiService } from 'src/app/services/api.service';
import { NotificationService, Position } from '@progress/kendo-angular-notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  constructor(
    private apiService : ApiService,
    private notificationService : NotificationService,
    private router : Router,
  ){}

model : Login = new Login();
notifPos : Position = { vertical: 'top', horizontal:'center'}

login() {

  if(!this.model.email || !this.model.password){
    this.notificationService.show({
      content: "`Email and password can not be empty",
      type: {style: 'warning'},
      position: this.notifPos,
    })
    return
  }
  const emailRegex = new RegExp(/^[^\s@]+@[^\s@]+(\.[^\s@]{2,})+$/);
  if(!emailRegex.test(this.model.email)){
    this.notificationService.show({
      content: "Email is invalid",
      type: {style: 'warning'},
      position: this.notifPos
    })
    return
  }

  this.apiService.login(this.model).subscribe(data => {

    localStorage.setItem('token', data.token )
    localStorage.setItem('role',data.role)
    if(data.role == "admin") this.router.navigate(['/dashboard'])
    if(data.role == "operator") this.router.navigate(['/request-list'])
    if(data.role == "broker") this.router.navigate(['broker-requests'])
    
  }
  ,error => {
    if (error.status === 400) {
      this.notificationService.show({
        content: "Invalid credentials",
        type: {style: 'warning'},
        position: this.notifPos
      });
    }
  });
  

}
  

}