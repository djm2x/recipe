import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Carnet } from '../../model';

const API_URL = environment.apiUrl + 'Carnets'; // /NoteRecettes

@Injectable({
  providedIn: 'root'
})
export class CarnetService {

  constructor(private http: HttpClient) { }

  public post(c: Carnet) {
    return this.http.post<any>(API_URL, c);
  }

  public delete(idUser, idRecette) {
    return this.http.delete(API_URL + '/' + idUser + '/' + idRecette);
  }

  public getState(idUser, idRecette) {
    return this.http.get(API_URL + '/' + idUser + '/' + idRecette);
  }

  public getList(idUser, startIndex, pageSize) {
    return this.http.get(`${API_URL}/${idUser}/${startIndex}/${pageSize}`) as Observable<any>;
  }
}
