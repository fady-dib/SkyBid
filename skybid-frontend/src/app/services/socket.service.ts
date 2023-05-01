import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public message: BehaviorSubject<string> = new BehaviorSubject('');
  public requests: BehaviorSubject<any[]> = new BehaviorSubject([]);
  public notifications : BehaviorSubject<string> = new BehaviorSubject('');

  constructor() { 
    this.getRequests()
    this.getNotification()
  }

  socket = io('http://localhost:3006', 
  //{autoConnect:false},
  {
    // withCredentials: true,
    query: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0M2IwYjk4NGQxODEzZjI1MTA3MGYyZiIsImVtYWlsIjoicHJpc3RpbmVAaW5mby5jb20iLCJpYXQiOjE2ODI2MDMzNzZ9.xweObXCndwS1Ekn4nFbfuo4AvBEfYovMMbVhrSTRvP8' },
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

  public getRequests = () => {
    this.socket.on("getRequests", (requests) => {
      this.requests.next(requests)
    })
  }

  public getNotification = () => {
    console.log('socket service getNotification called');
    this.socket.on("notification", (notification)=> {
      this.notifications.next(notification)
      console.log(notification)
    })
  }

}
