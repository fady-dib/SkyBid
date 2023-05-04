import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, ) { }

  apiBaseUrl = "http://localhost:3006"

  
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
    });
  }



 login(model): Observable<any> {
  return this.http.post(`${this.apiBaseUrl}/auth/login`,model,{headers: this.getHeaders()})
 }

 register(model): Observable<any> {
  return this.http.post(`${this.apiBaseUrl}/auth/register`,model,{headers: this.getHeaders()})
 }

 requests(): Observable<any> {
  return this.http.get(`${this.apiBaseUrl}/user/requests`,{headers: this.getHeaders()})
 }

 getRequestbyId(id): Observable<any>{
  return this.http.get(`${this.apiBaseUrl}/user/getRequest/${id}`,{headers: this.getHeaders()})
}

getAircrafts() : Observable<any>{
  return this.http.get(`${this.apiBaseUrl}/aircraft`,{headers: this.getHeaders()})
}

getUsers() : Observable<any> {
  return this.http.get(`${this.apiBaseUrl}/admin/users`,{headers: this.getHeaders()})
}

getRequestsByBroker(): Observable <any>{
  return this.http.get(`${this.apiBaseUrl}/user/broker-requests`,{headers: this.getHeaders()})
}
}