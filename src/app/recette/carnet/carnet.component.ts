import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarnetService } from './carnet.service';
import { SessionService } from '../../auth/shared/session.service';
import { Recette, Carnet } from '../../model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-carnet',
  templateUrl: './carnet.component.html',
  styleUrls: ['./carnet.component.css']
})
export class CarnetComponent implements OnInit {
  // @Input() idRecette: number;
  list = [];
  idUser: string;
  myId = 0;
  // API_URL = environment.hubUrl;

  constructor(private route: ActivatedRoute, private service: CarnetService, private session: SessionService) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.idUser = params['id'];
        // this.getList(params['id']);
      }
    );
  }

  // getList(idUser) {
  //   this.service.getList(idUser).subscribe(
  //     r => {
  //       r.forEach(e => this.list.push(e._id.idRecette));
  //       console.log(this.list);
  //     },
  //     e => console.log(e)
  //   );
  // }
}
