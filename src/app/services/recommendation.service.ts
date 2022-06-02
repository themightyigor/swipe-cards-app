import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root',
})
export class RecommendationService {
  readonly API_URL = 'http://localhost:5000/recommendations';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Person[]>(this.API_URL);
  }
}
