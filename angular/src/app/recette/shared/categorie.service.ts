import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categorie } from '../../model';
import { environment } from '../../../environments/environment.prod';

const API_URL = environment.apiUrl + 'categories';
@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  constructor(private http: HttpClient) { }
  // post
  post(c: Categorie) {
    return this.http.post( API_URL, c);
  }
  // updat
  put(id, c: Categorie) {
    return this.http.put(API_URL + '/' + id, c/*, new RequestOptions({ method: RequestMethod.Put, headers: this.headers })*/);
  }
  // get recette
  get(id) {
    return this.http.get(API_URL + '/' + id/*, new RequestOptions({ method: RequestMethod.Put, headers: this.headers })*/);
  }
  // delete
  delete(id: number) {
    return this.http.delete(API_URL + '/' + id/*, new RequestOptions({ method: RequestMethod.Get, headers: this.headers })*/);
  }
  //
  getList() {
    return this.http.get(API_URL);
  }
}
