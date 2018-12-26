import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { SessionService } from '../shared/session.service';
import { ApiService } from '../shared/api.service';
import { User } from '../../model';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.css']
})
export class CompteComponent implements OnInit {
  o: User;
  public chefForm: FormGroup;
  // imgUser = '../assets/user.png';
  state = '';
  constructor(private route: ActivatedRoute, private service: ApiService, public router: Router
    , private session: SessionService) { }

  ngOnInit() {
    this.getObjectFromRouteResolver();
  }

  getObjectFromRouteResolver() {
    this.route.data.subscribe(
      r => {
        this.o = <User>r['mydata'];
        // console.log(this.o);
      }, e => {
        // console.log(e);
        this.router.navigate(['recette/all']);
      }
    );
  }

  put(o: FormData) {
    const jwt = 'mourabit';
    // console.log(o.get('object'));
    // return;
    this.service.put(this.o._id, o)
      .subscribe(r => {
        // console.log(r);
        this.session.doSignIn(jwt, r);
        this.router.navigate(['recette/all']);
      }, e => {
        console.log(e);
      });
  }

}


@Injectable({
  providedIn: 'root'
})
export class MyResolve implements Resolve<Observable<User>> {

  constructor(public service: ApiService) { }

  public resolve(route: ActivatedRouteSnapshot) {
    // console.log(route.paramMap.get('id'));
    return this.service.get(route.paramMap.get('id')) as Observable<User>;
  }

}
