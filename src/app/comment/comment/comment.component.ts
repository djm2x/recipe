import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { SessionService } from '../../auth/shared/session.service';
import { CommentService } from '../comment.service';
import { Comment } from '../../model';
import { environment } from '../../../environments/environment';
import * as io from 'socket.io-client';

const HUB = 'comments';
const ADD = 'add';
const EDIT = 'edit';
const DELETE = 'delete';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() idRecette: String;
  myForm: UntypedFormGroup;
  comments: Comment[];
  API_URL = environment.hubUrl;
  isReadonly = true;
  o: Comment = new Comment();
  commentSocket = io.connect(this.API_URL + HUB);

  constructor(private fb: UntypedFormBuilder, private service: CommentService, public session: SessionService) { }

  ngOnInit() {
    this.getComments();
    this.createForm();
    this.socket();
  }

  getComments(): void {
    this.service.getList(this.idRecette).subscribe(
      (r: Comment[]) => {
        this.comments = r;
      },
      e => console.error(e));
  }

  createForm() {
    this.myForm = this.fb.group({
      _id: this.o._id,
      description: [this.o.description, [Validators.required]],
      date: this.o.date,
      idUser: this.session.userID(),
      idRecette: this.idRecette,
    });
  }

  resetForm() {
    // this.o = new Comment();
    this.myForm.reset({
      _id: this.o._id,
      description: this.o.description,
      date: this.o.date,
      idUser: this.session.userID(),
      idRecette: this.idRecette,
    });
  }

  isMyCommnent(idUser): boolean {
    return this.session.userID() === idUser;
  }

  submit(o: UntypedFormGroup) {
    this.service.post(o.value).subscribe(
      responce => {
        console.log(responce);
        this.resetForm();
      },
      error => console.log('error = ' + error.status)
    );
  }


  edit(o: Comment) {
    if (!this.isReadonly) { // le text area est modifiable
      this.service.put(o._id, o).subscribe(
        responce => {
          console.log('responce = ' + responce);
          this.resetForm();
        },
        error => console.log('error = ' + error.status)
      );
      this.isReadonly = true;
    } else {
      this.isReadonly = false;
    }
  }

  delete(id: number) {
    this.service.delete(id, this.idRecette)
      .subscribe(
        responce => console.log('responce = ' + responce),
        error => console.log('error = ' + error.status)
      );
  }

  socket() {
    //
    this.commentSocket.on(ADD, (r) => {
      if (this.idRecette === r.idRecette) {
        this.comments.push(r.comment);
      }
      // this.comments.push(r);
      // this.createForm();
    });
    //
    this.commentSocket.on(EDIT, r => {
      if (this.idRecette === r.idRecette) {
        let i = 0;
        i = this.comments.findIndex(c => c._id === r.comment._id);
        this.comments[i] = r.comment;
        this.resetForm();
      }
    });
    //
    this.commentSocket.on(DELETE, r => {
      if (this.idRecette === r.idRecette) {
        let i = 0;
        i = this.comments.findIndex(c => c._id === r.idComment);
        this.comments.splice(i, 1);
        // this.resetForm();
        // this.comments.map( o => o._id !== id).;
      }
    });
  }
}
