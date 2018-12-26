import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { SessionService } from '../../auth/shared/session.service';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

const API_URL = environment.apiUrl + 'Recettes';

@Injectable({
  providedIn: 'root'
})
export class RecetteService {

  constructor(private http: HttpClient, public session: SessionService) { }

  post(o: any) {
    return this.http.post( API_URL, o);
  }
  // updat
  put(id, recette: any) {
    return this.http.put(API_URL + '/' + id, recette);
  }
  // list
  getList(startIndex, pageSize) {
    return this.http.get(`${API_URL}/${startIndex}/${pageSize}`) as Observable<any>;
  }
  // list
  getListbyUser(id, startIndex, pageSize) {
    // debugger
    return this.http.get(`${API_URL}/byUser/${id}/${startIndex}/${pageSize}`) as Observable<any>;
  }
  // get recette
  get(id) {
    return this.http.get(API_URL + '/' + id);
  }
  // delete
  delete(id: number) {
    return this.http.delete(API_URL + '/' + id);
  }
}
