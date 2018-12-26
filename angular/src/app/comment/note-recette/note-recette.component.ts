import { Component, OnInit, Input } from '@angular/core';
import { NoteService } from './note.service';
import { SessionService } from '../../auth/shared/session.service';
import { NoteRecette } from '../../model';
import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment';

const HUB = 'noteRecette';
const ADD = 'add';
const DELETE = 'delete';
const HUB_URL = environment.hubUrl;
@Component({
  selector: 'app-note-recette',
  templateUrl: './note-recette.component.html',
  styleUrls: ['./note-recette.component.css']
})
export class NoteRecetteComponent implements OnInit {
  @Input() idRecette = '';
  idUser = '';
  liked = false;
  totalLikeRecette = 0;
  styleBtn = '';
  commentSocket = io.connect(HUB_URL + HUB);

  constructor(public session: SessionService, public service: NoteService) {
    this.idUser = session.userID();
  }

  ngOnInit() {
    this.getNoteRecette();
    this.checkJaime();
    this.socket();
  }

  getNoteRecette() {
    // console.log(this.idRecette);
    this.service.getNoteRecette(this.idRecette).subscribe(
      (r: number) => {
        this.totalLikeRecette = r;
      },
      e => console.log(e)
    );
  }

  checkJaime() {
    if (!this.session.isSignedIn()) {
      return;
    }
    this.service.isLiked(this.idUser, this.idRecette).subscribe(
      (b: boolean) => {
        this.liked = b;
        if (b) {
          this.styleBtn = 'warn';
        }
      },
      e => console.log(e)
    );
  }

  jaime() {
    if (!this.liked) {
      this.add();
    } else {
      this.delete();
    }
  }

  add() {
    const o: NoteRecette = {
      _id: {
        idUser: this.idUser,
        idRecette: this.idRecette,
      },
      note: 1
    };

    this.service.post(o)
      .subscribe(
        r => {
          this.liked = true;
          this.styleBtn = 'warn';
        },
        e => console.log(e)
      );
  }

  delete() {
    this.service.delete(this.idUser, this.idRecette)
      .subscribe(
        r => {
          this.liked = false;
          this.styleBtn = 'btn-light';
        },
        e => console.log(e)
      );
  }

  socket() {
    this.commentSocket.on(ADD, (r: NoteRecette) => {
      const isThis = r._id.idRecette === this.idRecette && r._id.idUser === this.idUser;
      if (isThis) {
        this.totalLikeRecette += 1;
        this.styleBtn = 'warn';
        this.liked = true;
      }
    });

    this.commentSocket.on(DELETE, (r: NoteRecette) => {
      const isThis = r._id.idRecette === this.idRecette && r._id.idUser === this.idUser;
      if (isThis) {
        this.totalLikeRecette -= 1;
        this.styleBtn = '';
        this.liked = false;
      }
    });
  }
}
