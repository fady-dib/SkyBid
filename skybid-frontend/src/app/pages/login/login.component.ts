import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/models/login';
import { ApiService } from 'src/app/services/api.service';
import { Observable, catchError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  constructor(
    private apiService : ApiService,
  ){}

model : Login = new Login();



login() {


  if(!this.model.email || !this.model.password){
    alert(`Email and password can not be empty`)
    return
  }
  const emailRegex = new RegExp('^[^\s@]+@[^\s@]+\.[^\s@]+$');
  const passwordRegex = new RegExp('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$')
  if(!emailRegex.test(this.model.email)){
    alert(`Email is invalid`)
    return
  }
  // if(!passwordRegex.test(this.model.password)){
  //   alert('Minimum password length is 8 character and should contain at least one lowercase, one uppercase, one')
  // }
  this.apiService.login(this.model).subscribe(data => {
    localStorage.setItem('token', data.token )
  });
  

}

}