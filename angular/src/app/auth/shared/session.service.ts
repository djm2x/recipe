import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../../model';
import { isPlatformBrowser } from '@angular/common';

const KEYTOKEN = 'TOKEN';
const KEYUSER = 'USER';
@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private accessToken = '';
  public user: User;
  private headers: HttpHeaders;
  // private imgUser = '../assets/user.png';

  constructor(private router: Router, @Inject(PLATFORM_ID) protected platformId: Object) {
    this.getSession();
  }

  get token() { return this.accessToken; }

  public userName() {
    if (this.user) {
      return `${this.user.nom} ${this.user.prenom}`;
    }
    return 'User';
  }

  get role(): boolean {
    if (this.user && this.user.role === 1988) {
      return true;
    }
    return false;
  }

  public userID() {
    if (this.user) {
      return this.user._id;
    }
    return '';
  }

  public isAdmin(): boolean {
    if (this.user && this.user.role === 2008) {
      return true;
    }
    return false;
  }

  get userImg(): string {
    // console.log(this.session.User.imgUrl);
    if (this.user && this.user.imgUrl) {
      // console.log(this.user.imgUrl);
      return this.user.imgUrl;
    }
    return '../assets/user.png';
  }

  public getToken(): string {
    return this.accessToken;
  }


  // se connecter
  public doSignIn(token: string, user: User) {
    if ((!token) || (!user)) {
      return;
    }
    this.user = user;
    this.accessToken = token;
    // console.log(this.user);
    if (isPlatformBrowser(this.platformId)) {
      // localStorage.clear();
      localStorage.setItem(KEYTOKEN, token);
      localStorage.setItem(KEYUSER, btoa(JSON.stringify(user)));
    }
  }

  // se deconnecter
  public doSignOut(): void {
    // remove user from local storage to log user out
    this.accessToken = null;
    this.user = null;
    this.headers = null;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(KEYTOKEN);
      localStorage.removeItem(KEYUSER);
      // this.router.navigate(['']);
    }
  }

  // this methode is for our auth guard
  public isSignedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      // console.log(!!localStorage.getItem(KEYUSER) && !!localStorage.removeItem(KEYTOKEN));
      return !!localStorage.getItem(KEYUSER) && !!localStorage.getItem(KEYTOKEN);
    }
  }

  //
  public getSession(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem(KEYTOKEN) && localStorage.getItem(KEYUSER)) {
        this.accessToken = localStorage.getItem(KEYTOKEN);
        this.user = JSON.parse(atob(localStorage.getItem(KEYUSER)));
      }
    }
  }


  // get header for http request need autorized
  public getHeaders(): HttpHeaders {
    if (this.accessToken) {
      this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.accessToken
      });
    }
    return this.headers;
  }
}
