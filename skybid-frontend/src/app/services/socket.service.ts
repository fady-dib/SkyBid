import { Inject, Injectable, forwardRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";
import { Request } from '../models/request';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})


export class SocketService {

  public message: BehaviorSubject<{}> = new BehaviorSubject({});
  public requests: BehaviorSubject<any[]> = new BehaviorSubject([]);
  public notifications : BehaviorSubject<string> = new BehaviorSubject('');
  public bid : BehaviorSubject<[]> = new BehaviorSubject([]);
  public bid_request_id : BehaviorSubject<string> = new BehaviorSubject('');

  constructor(
     private authService: AuthService
  ) { 
    
  }

  private socket: any;

  public connect() {
    if (!this.socket || this.socket.disconnected) {
      this.socket = io('http://localhost:3006', { query: { token: this.authService.getToken() } });
      this.getRequests()
    this.getNotification()
    this.getBids()
  }
}

  public sendMessage(model) {
    this.socket.emit('chatMessage', model);
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
      console.log(requests)
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

  public deleteRequest = (request_id) => {
    if (this.socket) {
      this.socket.emit('deleteRequest', request_id);
    } else {
      console.error('Socket not initialized');
    }
  }

  public addBid = (bid,request) => {
    this.socket.emit('newBid',bid,request)
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }



}
