import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

model : Login = new Login();

login() {
  
}

}