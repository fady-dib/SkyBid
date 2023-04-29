import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, ) { }

  apiBaseUrl = "https://localhost:3006"

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

 login(model) {
  return this.http.post(`${this.apiBaseUrl}/auth/login`,{model},{headers: this.headers})
 }

}
