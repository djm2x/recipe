import { Component, OnInit, Input } from '@angular/core';
import { CarnetService } from '../carnet.service';
import { SessionService } from '../../../auth/shared/session.service';
import { Recette, Carnet } from '../../../model';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  @Input() recette: Recette;
  idRecette = '';
  idUser = '';
  added = false;
  styleBtn = '';
  constructor(public session: SessionService, private service: CarnetService) {
    this.idUser = session.userID();
  }

  ngOnInit() {
    this.idRecette = this.recette._id;
    this.checkAdd();
  }

  checkAdd() {
    if (!this.session.isSignedIn()) {
      return;
    }
    this.service.getState(this.idUser, this.idRecette)
      .subscribe(
        (r: boolean) => {
          // console.log('checkAdd >>>>>>>>>>>>>>>>>>>>>> ', r);
          this.added = r; // r soit 1 ou 0
          if (this.added) {
            this.styleBtn = 'accent';
          } else {
            this.styleBtn = '';
          }
        },
        e => console.log(e)
      );
  }

  addToCarnet() {
    if (!this.added) {
      this.add();
    } else {
      this.delete();
    }
  }

  add() {
    const o: Carnet = {
      _id: {
        idUser: this.idUser,
        idRecette: this.idRecette,
      },
      date: new Date()
    };
    this.service.post(o)
      .subscribe(
        r => {
          this.added = true;
          this.styleBtn = 'accent';
        },
        e => console.log(e)
      );
  }

  delete() {
    this.service.delete(this.idUser, this.idRecette)
      .subscribe(
        r => {
          console.log('deleted >>>>>>>>>>>>>>>>>>>>>>');
          this.added = false;
          this.styleBtn = '';
        },
        e => console.log(e)
      );
  }

}
