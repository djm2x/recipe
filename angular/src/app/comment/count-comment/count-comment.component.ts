import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CommentService } from '../comment.service';
import * as io from 'socket.io-client';

const HUB = 'comments';
const COUNT = 'count';
const HUB_URL = environment.hubUrl;

@Component({
  selector: 'app-count-comment',
  templateUrl: `./count-comment.component.html`,
  // styleUrls: ['./note-recette.component.css']
})
export class CountCommentComponent implements OnInit {
  @Input() idRecette: number;
  countComment = 0;
  styleBtn = ''; //  btn-warning
  // hub
  commentSocket = io.connect(HUB_URL + HUB);

  constructor(public service: CommentService) { }

  ngOnInit() {
    this.getCountComment();
    this.socket();
  }

  getCountComment() {
    this.service.getCountComment(this.idRecette)
      .subscribe(
        (r: number) => {
          this.countComment = r;
          this.setColor(r);
        },
        e => console.log(e)
      );
  }

  setColor(i: number) {
    if (i !== 0) {
      this.styleBtn = 'warn';
    }
  }
  socket() {
    this.commentSocket.on(COUNT, (r) => {
      if (this.idRecette === r.idRecette) {
        this.countComment += r.note;
      }
    });
  }
}
