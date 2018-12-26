import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Comment } from '../model';

const API_URL = environment.apiUrl + 'comments';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private http: HttpClient) { }
  // post
  post(comment: Comment) {
    return this.http.post(API_URL, comment);
  }

  put(id, comment: Comment) {
    return this.http.put(API_URL + '/' + id, comment);
  }

  get(id) {
    return this.http.get(API_URL + '/' + id);
  }

  getList(id) {
    return this.http.get(API_URL + '/' + id);
  }

  delete(idComment, idRecette) {
    return this.http.delete(`${API_URL}/${idComment}/${idRecette}`);
  }

  public getCountComment(idRecette) {
    return this.http.get(API_URL + '/count/' + idRecette);
  }

}
