import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, ) { }

  apiBaseUrl = "http://localhost:3006"

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

 login(model): Observable<any> {
  return this.http.post(`${this.apiBaseUrl}/auth/login`,model,{headers: this.headers})
 }

 register(model): Observable<any> {
  return this.http.post(`${this.apiBaseUrl}/auth/register`,model,{headers: this.headers})
 }

}
