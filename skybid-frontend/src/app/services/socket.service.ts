import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";
import { Request } from '../models/request';

@Injectable({
  providedIn: 'root'
})


export class SocketService {

  public message: BehaviorSubject<string> = new BehaviorSubject('');
  public requests: BehaviorSubject<any[]> = new BehaviorSubject([]);
  public notifications : BehaviorSubject<string> = new BehaviorSubject('');
  public bid : BehaviorSubject<[]> = new BehaviorSubject([]);
  public bid_request_id : BehaviorSubject<string> = new BehaviorSubject('');

  constructor() { 
    this.getRequests()
    this.getNotification()
    this.getBids()
  }

  token = localStorage.getItem('token')

  socket = io('http://localhost:3006', 
  //{autoConnect:false},
  {
    // withCredentials: true,
    query: { token:this.token}
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

  public getBids = () => {
    this.socket.on("newBid", (bid , request_id) => {
      this.bid.next(bid)
      this.bid_request_id.next(request_id)
    })
  }

  public createRequest = (request: Request) => {
    this.socket.emit('createRequest', request)
  }

}
