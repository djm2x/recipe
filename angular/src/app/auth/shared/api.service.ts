import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response, RequestMethod } from '@angular/http';
import { SessionService } from './session.service';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment';
import { User } from '../../model';

const API_URL = environment.apiUrl + 'users'; // api/Recettes
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private session: SessionService) { }

  public post(o: any): Observable<any> {
    return this.http.post<any>(API_URL, o);
  }

  public logIn(model): Observable<any> {
    return this.http.post<any>(API_URL + '/login', model);
  }

  public getById(id: number): Observable<User> {
    return this.http.get(API_URL + 'Chefs/' + id) as Observable<User>;
  }

  public put(id, o: any): Observable<User> {
    return this.http.put(API_URL + '/' + id, o) as Observable<User>;
  }

  public get(idUser) {
    return this.http.get(API_URL + '/' + idUser) as Observable<User>;
  }

  public getAll(): Observable<User[]> {
    return this.http.get(API_URL + 'Chefs') as Observable<User[]>;
  }

  public deleteById(id: number): Observable<User> {
    return this.http.delete(API_URL + 'Chefs/' + id) as Observable<User>;
  }

  // private handleError(error: Response | any) {
  //   console.error('ApiService::handleError', error);
  //   return Observable.throw(error);
  // }

}
