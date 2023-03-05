import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import * as jwt_decode from 'jwt-decode';
import { User } from '../../model';
import { SessionService } from '../shared/session.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  public myForm: UntypedFormGroup;
  model: LoginDto = new LoginDto();
  hide = true;
  constructor(private api: ApiService, private fb: UntypedFormBuilder
    , public router: Router, private session: SessionService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.myForm = this.fb.group({
      email: [this.model.email, [
        Validators.required,
        Validators.email
      ]],
      password: [this.model.password, Validators.required]
    });
  }

  // rebuildForm() {
  //   this.myForm.reset({
  //     email: this.model.email,
  //     password: this.model.password
  //   });
  // }

  submit(o: UntypedFormGroup) {
    if (!o.valid) {
      return;
    }
    const obj = o.value as User;
    const jwt = 'mourabit';
    this.api.logIn(obj)
        .subscribe((r: Res) => {
          // console.log(r);
          this.session.doSignIn(r.accessToken, r.user);
          this.router.navigate(['/recette/all']);
        }, e => {
          console.log(e);
        });
  }

}

interface Res {
  auth: string;
  user: User;
  accessToken: string;
}

class LoginDto {
  email = 'dj-m2x@angular.io';
  password = '123456';
}

class LoginDto0 {
  email = '';
  password = '';
}


