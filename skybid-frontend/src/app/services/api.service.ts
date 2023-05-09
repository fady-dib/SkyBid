import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private authService : AuthService ) { }

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

getUser() : Observable <any> {
  return this.http.get(`${this.apiBaseUrl}/user`,{headers: this.getHeaders()})
}

deleteRequest(request_id) : Observable < any> {
  return this.http.delete(`${this.apiBaseUrl}/user/${request_id}`, {headers: this.getHeaders()})
}

acceptBid(request_id) : Observable <any> {
  return this.http.post(`${this.apiBaseUrl}/user/accept-bid`,{request_id : request_id}, {headers: this.getHeaders()})
}

addAircraft(model) :Observable <any> {
  return this.http.post(`${this.apiBaseUrl}/aircraft`,model, {headers: this.getHeaders()})
}

deleteAircraft(aircraft_id) :Observable <any> {
  return this.http.delete(`${this.apiBaseUrl}/aircraft/${aircraft_id}`, {headers: this.getHeaders()})
}

uploadImage(form_data:FormData) :Observable <any> {

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.authService.getToken()}`
  });

  return this.http.post(`${this.apiBaseUrl}/aircraft/image`,form_data, {headers})

}

deleteAndUpdateImage(formData: FormData): Observable<any> {

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.authService.getToken()}`
  });

  return this.http.post(`${this.apiBaseUrl}/aircraft/update-image`, formData,{headers});
}

}