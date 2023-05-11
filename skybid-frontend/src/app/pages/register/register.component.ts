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
const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  if(!emailRegex.test(this.model.email)){
    this.notificationService.show({
      content: "Email is invalid",
      type: {style: 'warning'},
      position: this.notifPos
    })
    return
  }

  if(!passwordRegex.test(this.model.password)){
    this.notificationService.show({
      content: "The password must contain at least one digit, one special character, one lowercase letter, one uppercase letter, and have a minimum length of 8 characters. ",
      type: {style: 'warning'},
      position: this.notifPos
    })
    return
  }

  this.apiService.register(this.model).subscribe(() => {
  this.router.navigate(['login'])
  });

}

countries: string[] = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Austrian Empire',
  'Azerbaijan',
  'Baden',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Bavaria*',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin (Dahomey)',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Botswana',
  'Brazil',
  'Brunei',
  'Brunswick and Lüneburg',
  'Bulgaria',
  'Burkina Faso (Upper Volta)',
  'Burma',
  'Burundi',
  'Cabo Verde',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Cayman Islands, The',
  'Central African Republic',
  'Central American Federation',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Comoros',
  'Congo Free State',
  'Costa Rica',
  'Cote d’Ivoire (Ivory Coast)',
  'Croatia',
  'Cuba',
  'Cyprus',
  'Czechia',
  'Czechoslovakia',
  'Democratic Republic of the Congo',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'Duchy of Parma',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Eswatini',
  'Ethiopia',
  'Fiji',
  'Finland',
  'France',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Grand Duchy of Tuscany',
  'Greece',
  'Grenada',
  'Guatemala',
  'Guinea',
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Hanover',
  'Hanseatic Republics',
  'Hawaii',
  'Hesse',
  'Holy See',
  'Honduras',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  'Korea',
  'Kosovo',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Lew Chew (Loochoo)',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Mauritania',
  'Mauritius',
  'Mecklenburg-Schwerin',
  'Mecklenburg-Strelitz',
  'Mexico',
  'Micronesia',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Morocco',
  'Mozambique',
  'Namibia',
  'Nassau',
  'Nauru',
  'Nepal',
  'Netherlands',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'North German Confederation',
  'North German Union',
  'North Macedonia',
  'Norway',
  'Oldenburg',
  'Oman',
  'Orange Free State',
  'Pakistan',
  'Palau',
  'Panama',
  'Papal States',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Piedmont-Sardinia',
  'Poland',
  'Portugal',
  'Qatar',
  'Republic of Genoa',
  'Republic of Korea (South Korea)',
  'Republic of the Congo',
  'Romania',
  'Russia',
  'Rwanda',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Vincent and the Grenadines',
  'Samoa',
  'San Marino',
  'Sao Tome and Principe',
  'Saudi Arabia',
  'Schaumburg-Lippe',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Sudan',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'Suriname',
  'Sweden',
  'Switzerland',
  'Syria',
  'Tajikistan',
  'Tanzania',
  'Texas',
  'Thailand',
  'Timor-Leste',
  'Togo',
  'Tonga',
  'Trinidad and Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Tuvalu',
  'Two Sicilies',
  'Uganda',
  'Ukraine',
  'Union of Soviet Socialist Republics',
  'United Arab Emirates',
  'United Kingdom',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Venezuela',
  'Vietnam',
  'Württemberg',
  'Yemen',
  'Zambia',
  'Zimbabwe'
];


}
