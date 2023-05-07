import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/models/login';
import { ApiService } from 'src/app/services/api.service';
import { Observable, catchError } from 'rxjs';
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
    private router : Router
  ){}

model : Login = new Login();
notifPos : Position = { vertical: 'top', horizontal:'center'}

login() {


  if(!this.model.email || !this.model.password){
    this.notificationService.show({
      content: "`Email and password can not be empty",
      type: {style: 'info'},
      position: this.notifPos,
    })
    return
  }
  const emailRegex = new RegExp(/^[^\s@]+@[^\s@]+(\.[^\s@]{2,})+$/);
  const passwordRegex = new RegExp('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$')
  if(!emailRegex.test(this.model.email)){
    this.notificationService.show({
      content: "Email is invalid",
      type: {style: 'info'},
      position: this.notifPos
    })
    return
  }
  // if(!passwordRegex.test(this.model.password)){
  //   alert('Minimum password length is 8 character and should contain at least one lowercase, one uppercase, one')
  // }
  this.apiService.login(this.model).subscribe(data => {
    console.log('token', data.token);
    console.log('role', data.role);
    localStorage.setItem('token', data.token )
    localStorage.setItem('role',data.role)
    if(data.role == "admin") this.router.navigate(['/dashboard'])
    if(data.role == "operator") this.router.navigate(['/request-list'])
    if(data.role == "broker") this.router.navigate(['broker-requests'])
  });
  

}

}