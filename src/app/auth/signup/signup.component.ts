import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { User } from '../../model';
import { SessionService } from '../shared/session.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  @Input() o: User = new User();
  @Output() eventToParent = new EventEmitter<any>();
  public myForm: UntypedFormGroup;
  hide = true;

  file: File = null;
  imgUrl: string;
  colorInputFile = '';
  constructor(private service: ApiService, private fb: UntypedFormBuilder, private router: Router) { }

  ngOnInit() {
    // console.log(this.o);
    this.createForm();
    if (this.o._id !== '') {
      // this.myForm.get('password').setValidators(null);
      // this.myForm.get('passwordConfirmation').setValidators(null);
    }
  }
  // reset input
  createForm() {
    this.myForm = this.fb.group({
      id: this.o._id,
      nom: [this.o.nom, [
        Validators.minLength(4),
        Validators.required
      ]],
      prenom: [this.o.prenom, [
        Validators.minLength(4),
        Validators.required
      ]],
      email: [this.o.email, [
        Validators.email,
        Validators.required
      ]],
      password: [this.o.password, [
        Validators.minLength(6),
        Validators.required,
      ]],
      passwordConfirmation: [this.o.password, [
        Validators.minLength(6),
        Validators.required,
      ]],
      dateNaissance: [this.o.dateNaissance],
      civilite: [this.o.civilite, [Validators.required]],
      apropos: [this.o.apropos],
      imgUrl: [null, /*[Validators.required]*/],
    });
  }

  getFileFromImgUpload(f: File) {
    this.file = f;
    console.log(this.file.name);
  }


  passwordConfirmation() {
    if (this.myForm.get('password').value !== this.myForm.get('passwordConfirmation').value) {
      this.myForm.get('passwordConfirmation').setErrors({ notUNique: true });
      return;
    }
  }

  get nom() { return this.myForm.get('nom'); }
  get prenom() { return this.myForm.get('prenom'); }
  get email() { return this.myForm.get('email'); }
  get password() { return this.myForm.get('password'); }
  get passwordCfm() { return this.myForm.get('passwordConfirmation'); }
  get dateNaissance() { return this.myForm.get('dateNaissance'); }
  // get civilite() { return this.myForm.get('civilite'); }
  get apropos() { return this.myForm.get('apropos'); }
  // get imgUrl() { return this.myForm.get('imgUrl'); }

  submit(o: UntypedFormGroup) {
    this.passwordConfirmation();

    if (!o.valid) {
      // if (this.myForm.get('imgUrl').valid === false) {
      //   this.colorInputFile = 'warn';
      // }
      console.log('there');
      return;
    }
    // console.log(o.value);
    // return;
    const obj = o.value as User;

    const formData = this.checkImageIfExiste(obj);
    console.log(formData.get('object'));
    // console.log('id ', this.o._id);
    if (this.o._id === '' || this.o._id === undefined || this.o._id === null) {
      this.post(formData);
      // this.rebuildForm();
    } else {
      this.put(formData);
      // this.rebuildForm();
    }
  }

  checkImageIfExiste(obj: any): FormData {
    const formData = new FormData();
    // console.log(this.file);
    if (this.file === undefined || this.file === null) {
      obj.imgUrl = this.o.imgUrl;
      formData.append('object', JSON.stringify(obj));
      // formData.append('file', this.file, this.file.name);
      // if (this.o._id === '') {
      //   console.log(obj);
      //   return;
      // }
    } else {
      obj.imgUrl = `users/${this.file.name}`;
      formData.append('object', JSON.stringify(obj));
      formData.append('file', this.file, this.file.name);
    }
    return formData;
  }

  post(o: FormData) {
    console.log(o);
    this.service.post(o)
      .subscribe(
        (response: any) => {
          this.router.navigate(['auth/login']);
        },
        error => {
          console.log(error);
        }
      );
  }

  put(obj: any) {
    this.eventToParent.next(obj);
  }
}
