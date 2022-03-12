import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bins } from './model';
import { environment } from '../../../environments/environment';

const API_URL = environment.apiUrl + 'bins';
@Injectable({
  providedIn: 'root'
})

export class IssamService {
  // list: Quartier[];
  constructor(private http: HttpClient) { }
  // post
  post(obj: Bins) {
    return this.http.post( API_URL, obj);
  }
  // updat
  put(obj: Bins) {
    return this.http.put(API_URL + '/' + obj._id, obj);
  }
  // list
  getList() {
    return this.http.get(API_URL) as Observable<Bins[]>;
  }
  // get recette
  get(id) {
    return this.http.get(API_URL + '/' + id);
  }
  // delete
  delete(obj: Bins) {
    return this.http.delete(API_URL + '/' + obj._id);
  }
}

interface Reponce {
  count: number;
  list: any[];
}



