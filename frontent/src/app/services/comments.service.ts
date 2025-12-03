import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:8000";

  getComments(id){
    const data = {
      itemId : id
    }
    return this.http.post(`${this.uri}/comments/getComments`, data);
  }
}
