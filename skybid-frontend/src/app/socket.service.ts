import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public message: BehaviorSubject<string> = new BehaviorSubject('');
  constructor() { }

  socket = io('http://localhost:3006', {
    withCredentials: true,
    query: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0M2IwYjk4NGQxODEzZjI1MTA3MGYyZiIsImVtYWlsIjoicHJpc3RpbmVAaW5mby5jb20iLCJpYXQiOjE2ODIyODkyNjN9.UlwxuN1lBi3FGjA5Qw3tbM-6dX5zEOgsskMpUz9WRrg' },
  });

  public sendMessage(message:string) {
    this.socket.emit('chatMessage', message);
  }

  public getNewMessage = () => {
    this.socket.on('chatMessage', (message) =>{
      this.message.next(message);
    });

    return this.message.asObservable();
  };

}
