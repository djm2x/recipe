import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Recette } from '../../model';
import { MatDialog, MatPaginator } from '@angular/material';
import { DeleteRecetteComponent } from '../delete-recette/delete-recette.component';
import { SessionService } from '../../auth/shared/session.service';
import { RecetteService } from '../shared/recette.service';
import { CarnetService } from '../carnet/carnet.service';

@Component({
  selector: 'app-list-recette-shared',
  templateUrl: './list-recette-shared.component.html',
  styleUrls: ['./list-recette-shared.component.css']
})
export class ListRecetteSharedComponent implements OnInit {
  list = [];
  @Input() idUserRecette: string;
  @Input() idUserCarnet: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  resultsLength = 0;
  imgUrl = '../../../assets/uploadIMG.png';
  constructor(public dialog: MatDialog, private session: SessionService
    , private service: RecetteService, private serviceCrn: CarnetService) { }

  ngOnInit() {
    this.methode();
    this.setPagination();
  }

  // imgError(img: any) {
  //   img.src = this.imgUrl;
  // }

  isAutoriseToUpdate(idUser) {
    if (idUser === this.idUserActuel || this.session.role) {
      return true;
    }
    return false;
  }

  public setPagination() {
    // this.paginator.pageIndex = 0;
    this.paginator.page.subscribe(info => {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      // console.log(this.paginator.pageIndex , this.paginator.pageSize);
      this.getAll(startIndex, this.paginator.pageSize);
    });
  }

  methode() {
    if (this.idUserCarnet) {
      this.getListFavorie(this.idUserCarnet);
    } else if (this.idUserRecette) {
      this.getListByUser(this.idUserRecette);
    } else {
      this.getAll();
    }
  }
  // get all recette
  getAll(startIndex = 0, pageSize = 6) {
    this.service.getList(startIndex, pageSize).subscribe(
      r => {
        this.list = r.list;
        this.resultsLength = r.count;
      },
      e => {
        console.log(e);
      });
  }
  // carnet
  getListFavorie(idUser, startIndex = 0, pageSize = 6) {
    this.serviceCrn.getList(idUser, startIndex, pageSize).subscribe(
      r => {
        r.list.forEach(e => this.list.push(e._id.idRecette));
        this.resultsLength = r.count;
      },
      e => console.log(e)
    );
  }
  // get receip create by user
  getListByUser(id, startIndex = 0, pageSize = 6) {
    this.service.getListbyUser(id, startIndex, pageSize).subscribe(
      r => {
        this.list = r.list;
        this.resultsLength = r.count;
      },
      e => console.log(e)
    );
  }

  get idUserActuel() { return this.session.userID(); }

  openDialog(id): void {
    const dialogRef = this.dialog.open(DeleteRecetteComponent, {
      width: '550px',
      data: { id: id/*, obj: 'recette'*/ }
    });

    dialogRef.afterClosed().subscribe(r => {
      console.log('r = ', r);
      if (r === 'ok') {
        let i = 0;
        i = this.list.findIndex(c => c._id === id);
        this.list.splice(i, 1);
      } else {
        console.log('delete escaped');
      }
    });
  }

}
