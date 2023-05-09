import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  apiBaseUrl = 'http://localhost:3006';

  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    authorization: `Bearer ${this.authService.getToken()}`,
  });

  login(model): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/auth/login`, model, {
      headers: this.httpHeaders,
    });
  }

  register(model): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/auth/register`, model, {
      headers: this.httpHeaders,
    });
  }

  requests(): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/user/requests`, {
      headers: this.httpHeaders,
    });
  }

  getRequestbyId(id): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/user/getRequest/${id}`, {
      headers: this.httpHeaders,
    });
  }

  getAircrafts(): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/aircraft`, {
      headers: this.httpHeaders,
    });
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/admin/users`, {
      headers: this.httpHeaders,
    });
  }

  getRequestsByBroker(): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/user/broker-requests`, {
      headers: this.httpHeaders,
    });
  }

  getUser(): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/user`, {
      headers: this.httpHeaders,
    });
  }

  deleteRequest(request_id): Observable<any> {
    return this.http.delete(`${this.apiBaseUrl}/user/${request_id}`, {
      headers: this.httpHeaders,
    });
  }

  acceptBid(request_id): Observable<any> {
    return this.http.post(
      `${this.apiBaseUrl}/user/accept-bid`,
      { request_id: request_id },
      { headers: this.httpHeaders }
    );
  }

  addAircraft(model): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/aircraft`, model, {
      headers: this.httpHeaders,
    });
  }

  deleteAircraft(aircraft_id): Observable<any> {
    return this.http.delete(`${this.apiBaseUrl}/aircraft/${aircraft_id}`, {
      headers: this.httpHeaders,
    });
  }

  uploadImage(form_data: FormData): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });

    return this.http.post(`${this.apiBaseUrl}/aircraft/image`, form_data, {
      headers,
    });
  }

  deleteAndUpdateImage(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });

    return this.http.post(
      `${this.apiBaseUrl}/aircraft/update-image`,
      formData,
      { headers }
    );
  }
}
