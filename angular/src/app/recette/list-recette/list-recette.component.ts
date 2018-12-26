import { Recette } from '../../model';
import { Component, OnInit, Input } from '@angular/core';
import { RecetteService } from '../shared/recette.service';
import { SessionService } from '../../auth/shared/session.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-list-recette',
  templateUrl: './list-recette.component.html',
  styleUrls: ['./list-recette.component.css'],
})
export class ListRecetteComponent implements OnInit {
  // list: Recette[];
  idUser: string;
  myId = 0;
  // @Input() recetteSelected: Recette;
  constructor(private service: RecetteService, private session: SessionService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.idUser = params['id'];
        // this.getListByChef(params['id']);
      });
  }

  // getListByChef(id) {
  //   this.service.getListbyUser(id).subscribe(
  //     (list: Recette[]) => {
  //       this.list = list;
  //     },
  //     e => console.log(e)
  //   );
  // }

  // delete(id: number) {
  //   this.service.delete(id).subscribe(
  //     r => {
  //       console.log(r);
  //       let i = 0;
  //       i = 1; // this.list.findIndex(c => c.id === id);
  //       this.list.splice(i, 1);
  //     },
  //     e => console.log(e)
  //   );
  // }

}
