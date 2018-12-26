import { Injectable } from '@angular/core';
import { NoteService } from '../../comment/note-recette/note.service';

@Injectable({
  providedIn: 'root'
})
export class CommentHubService {
  private connection: any;

  url = 'SousCommentHub'; // CommentHub
  constructor(private noteService: NoteService) { }

  public commentHubCnx(): void {
    // this.connection = new signalR.HubConnection('http://localhost:62124/CommentHub', { logger: signalR.LogLevel.Trace });
    // this.connection = new HubConnection(this.url);
    // connecter au hub
    this.connection.start()
      .then(() => console.log('hub Sous Comment +++++++++++++++'))
      .catch(err => console.log('Error = ' + err));

    // attendre pour des mise a jour
    this.BroadcastComment();
    this.EditComment();
    this.DeleteComment();
  }
  //
  BroadcastComment(): void {
    // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> wait for ok');
    this.connection.on('BroadcastSousComment',
      (id: number, c: Comment) => {
        // this.msgs.push({ severity: type, summary: payload });
        // console.log('id sous comment: ' + id + ', description: ' + c.idParent);
        // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ok');
        // this.commentActuel.sousCommentaires.unshift(c);

        // c.idChefNavigation.imgUrl = atob(c.idChefNavigation.imgUrl);
        // this.sousComments.unshift(c);

        console.log('BroadcastSousComment 7777777777777777777');
        // this.noteService.countComment += 1;
        // this.createForm();
      }
    );
  }
  //
  EditComment(): void {
    this.connection.on('EditSousComment',
      (id: number, c: Comment) => {
        // this.msgs.push({ severity: type, summary: payload });
        // console.log('id: ' + id + ', description: ' + c.description);

        // let i = 0;
        // i = this.sousComments.findIndex(s => s.id === id);
        // this.sousComments[i] = c;


        // this.commentActuel.sousCommentaires.push(commentaire);
        // this.createForm();
      }
    );
  }
  //
  DeleteComment(): void {
    this.connection.on('DeleteSousComment',
      (id: number, s: Comment) => {
        // this.msgs.push({ severity: type, summary: payload });
        // console.log('id: ' + id + ', description: ' + s.description);


        // let i = 0;
        // i = this.sousComments.findIndex(c => c.id === id);
        // this.sousComments.splice(i, 1);


        // this.noteService.countComment -= 1;
        // this.commentActuel.sousCommentaires.push(commentaire);
        // this.createForm();
      }
    );
  }
}
