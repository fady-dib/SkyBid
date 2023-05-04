import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, ) { }

  apiBaseUrl = "http://localhost:3006"
  token = localStorage.getItem('token')
  
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'authorization': `Bearer ${this.token}`
  });



 login(model): Observable<any> {
  return this.http.post(`${this.apiBaseUrl}/auth/login`,model,{headers: this.headers})
 }

 register(model): Observable<any> {
  return this.http.post(`${this.apiBaseUrl}/auth/register`,model,{headers: this.headers})
 }

 requests(): Observable<any> {
  return this.http.get(`${this.apiBaseUrl}/user/requests`,{headers: this.headers})
 }

 getRequestbyId(id): Observable<any>{
  return this.http.get(`${this.apiBaseUrl}/user/getRequest/${id}`,{headers: this.headers})
}

getAircrafts() : Observable<any>{
  return this.http.get(`${this.apiBaseUrl}/aircraft`,{headers: this.headers})
}

getUsers() : Observable<any> {
  return this.http.get(`${this.apiBaseUrl}/admin/users`,{headers: this.headers})
}

getRequestsByBroker(): Observable <any> {
  return this.http.get(`${this.apiBaseUrl}/user/requests-broker`,{headers: this.headers})
}
}