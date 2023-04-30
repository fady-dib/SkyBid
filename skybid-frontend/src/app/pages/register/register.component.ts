import { Component } from '@angular/core';
import { Register } from 'src/app/models/register';
import { NotificationService, Position } from '@progress/kendo-angular-notification';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent {

  constructor(
    private notificationService : NotificationService
  ){}

model : Register = new Register();
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



}

}
