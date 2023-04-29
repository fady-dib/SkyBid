import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/models/login';
import { ApiService } from 'src/app/services/api.service';
import { Observable } from 'rxjs';

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
  this.apiService.login(this.model).subscribe(data => {
    const token = data.token
    localStorage.setItem('token', data.token )
  })
}

}