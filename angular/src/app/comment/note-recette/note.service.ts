import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { NoteRecette } from '../../model';

const API_URL = environment.apiUrl + 'noteRecettes'; // /NoteRecettes
@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient) { }

  public post(noteRecette: NoteRecette) {
    return this.http.post(API_URL, noteRecette);
  }

  public delete(idUser, idRecette) {
    return this.http.delete(API_URL + '/' + idUser + '/' + idRecette);
  }
  //
  public getNoteRecette(idRecette): Observable<any> {
    return this.http.get(API_URL + '/' + idRecette);
  }

  public isLiked(idUser, idRecette): Observable<any> {
    return this.http.get(API_URL + '/isLiked/' + idUser + '/' + idRecette);
  }

}
