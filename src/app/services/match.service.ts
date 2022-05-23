import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Match } from '../models/match.model';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  readonly API_URL = 'http://localhost:5000/matches';
  readonly DEFAULT_USER_ID = 1;

  constructor(private http: HttpClient) {}

  getOne(id = this.DEFAULT_USER_ID): Observable<Match> {
    const url = `${this.API_URL}/${id}`;

    return this.http.get<Match>(url);
  }
}
