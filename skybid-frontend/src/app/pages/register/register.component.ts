import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { NotificationService, Position } from '@progress/kendo-angular-notification';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent {

  constructor(
    private notificationService : NotificationService,
    private apiService : ApiService,
    private router: Router
  ){}

model : User = new User();
notifPos : Position = { vertical: 'top', horizontal:'center'}

register() {
let validations = []


if(this.model.company_name == null || this.model.company_name.trim() == ""){
  validations.push('Company name')
}
if(this.model.role == null || this.model.role.trim() == ""){
  validations.push('Role')
}
if(this.model.password == null || this.model.password.trim() == ""){
  validations.push('Password')
}
if(this.model.confirm_password == null || this.model.confirm_password.trim() == ""){
  validations.push('Confirm password')
}
if(this.model.country == null || this.model.country.trim() == ""){
  validations.push('Country')
}
if(this.model.city == null || this.model.city.trim() == ""){
  validations.push('city')
}
if(this.model.address == null || this.model.address.trim() == ""){
  validations.push('Address')
}
if(this.model.email == null || this.model.email.trim() == ""){
  validations.push('Email')
}
if(this.model.phone == null ){
  validations.push('Phone')
}


validations.forEach((value, index) => {
  let i = index + 1;
  validations[index] = i + ' : ' + value;
});

console.log(validations.join('\n'))

if (validations.length > 0) {
  this.notificationService.show({
    content: `Please fill in the following mandatory field(s):
      `+ validations.join('\n'),
    type: { style: 'warning' },
    position: this.notifPos
  });
  return;
}
const emailRegex = new RegExp('^[^\s@]+@[^\s@]+\.[^\s@]+$');
  const passwordRegex = new RegExp('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$')
  if(!emailRegex.test(this.model.email)){
    this.notificationService.show({
      content: "Email is invalid",
      type: {style: 'warning'},
      position: this.notifPos
    })
    return
  }

  this.apiService.register(this.model).subscribe(() => {
  this.router.navigate(['login'])
  });

}

}
