import { Component, OnInit, OnChanges, Injectable } from '@angular/core';
import { ActivatedRoute, Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { RecetteService } from '../shared/recette.service';
import { SessionService } from '../../auth/shared/session.service';
import { Recette } from '../../model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Title, Meta } from '@angular/platform-browser';

const API_URL = environment.hubUrl;
@Component({
  selector: 'app-detail-recette',
  templateUrl: './detail-recette.component.html',
  styleUrls: ['./detail-recette.component.css']
})
export class DetailRecetteComponent implements OnInit {
  sub: any;
  o: Recette;

  constructor(public session: SessionService, private route: ActivatedRoute
    , private title: Title, private meta: Meta, private router: Router) { }

  ngOnInit() {
    console.log(API_URL + this.router.url.substring(1));
    this.getObjectFromRouteResolver();
  }

  setSeo() {
    this.title.setTitle('recette : ' + this.o.nom);
    this.meta.updateTag({ 'og:title': this.o.nom });
    this.meta.updateTag({ 'og:description': this.o.discription });
    this.meta.updateTag({ 'og:image': API_URL + this.o.imgUrl });
    this.meta.updateTag({ 'og:url': API_URL +  this.router.url.substring(1)});
  }

  getObjectFromRouteResolver() {
    this.route.data.subscribe(
      r => {
        this.o = <Recette>r['mydata'];
        this.setSeo();
      },
      e => console.log(e)
    );
  }
}
//
@Injectable({
  providedIn: 'root'
})
export class MyDetailResolve implements Resolve<Observable<Recette>> {

  constructor(public service: RecetteService) { }

  public resolve(route: ActivatedRouteSnapshot) {
    // console.log(route.paramMap.get('id'));
    return this.service.get(route.paramMap.get('id')) as Observable<Recette>;
  }
}
