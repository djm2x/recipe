import { UowService } from './uow.service';
import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';
import { NoteRecette } from '../model';


const ADD = 'add';
const DELETE = 'delete';
const HUB_URL = environment.hubUrl;

@Injectable({
  providedIn: 'root'
})
export class RealTimeHubService {
  messageReceived = new Subject<any>();
  commentSubject = new Subject<{action: string, payload: NoteRecette}>();
  updateNotifFromChatComponent = new Subject <number>();
  notificationReceived = new Subject<any>();

  private hubConnection: any;
  noteRecetteSocket: io.Socket<any, any>;
  commentSocket: io.Socket<any, any>;
  constructor(private uow: UowService) { }


  public createConnection() {
    this.noteRecetteSocket = io.connect(environment.hubUrl + 'noteRecette');
    this.commentSocket = io.connect(environment.hubUrl + 'comments');
    // this.hubConnection = new HubConnectionBuilder()
    //   .withUrl(environment.url + '/ChatHub', { accessTokenFactory: () => this.session.token } as IHttpConnectionOptions)
    //   .withAutomaticReconnect([0, 2000, 10000, 30000, null])
    //   .configureLogging(LogLevel.None)
    //   .build();

    return this;
  }

  public startConnection(): void {
    // this.hubConnection.start().then(async (r) => {
    //   console.log('Hub connection started');

    //   this.hubConnection.on('receiveMessage', res => this.messageReceived.next(res));

    //   this.hubConnection.on('notification', res => this.notificationReceived.next(res));

    //   this.hubConnection.on('innerException', res => {
    //     console.warn('##################################################################');
    //     console.warn(res);
    //     console.warn('##################################################################');
    //   });

    // }).catch(e => {
    //   console.warn('Error while establishing connection signalr : ', e);
    // });

    this.noteRecetteSocket.on(ADD, (r: NoteRecette) => {

      this.commentSubject.next({action: 'add', payload: r});

    });

    this.noteRecetteSocket.on(DELETE, (r: NoteRecette) => {
      this.commentSubject.next({action: 'delete', payload: r});
    });

    // this.commentSocket.on(ADD, (r) => {
    //   if (this.idRecette === r.idRecette) {
    //     this.comments.push(r.comment);
    //   }
    //   // this.comments.push(r);
    //   // this.createForm();
    // });
    // //
    // this.commentSocket.on(EDIT, r => {
    //   if (this.idRecette === r.idRecette) {
    //     let i = 0;
    //     i = this.comments.findIndex(c => c._id === r.comment._id);
    //     this.comments[i] = r.comment;
    //     this.resetForm();
    //   }
    // });
    // //
    // this.commentSocket.on(DELETE, r => {
    //   if (this.idRecette === r.idRecette) {
    //     let i = 0;
    //     i = this.comments.findIndex(c => c._id === r.idComment);
    //     this.comments.splice(i, 1);
    //     // this.resetForm();
    //     // this.comments.map( o => o._id !== id).;
    //   }
    // });
  }

}
