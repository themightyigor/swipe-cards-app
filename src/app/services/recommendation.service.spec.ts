import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpHeaders } from '@angular/common/http';

import { RecommendationService } from './recommendation.service';
import { Person } from 'src/app/models/person.model';

describe('RecommendationService', () => {
  let service: RecommendationService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(RecommendationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return person data', () => {
    const mockPersons: Person[] = [
      {
        name: 'Carrie',
        id: 1,
        age: 21,
      },
      {
        name: 'Samantha',
        id: 2,
        age: 23,
      },
      {
        name: 'Charlotte',
        id: 3,
        age: 25,
      },
      {
        name: 'Miranda',
        id: 4,
        age: 27,
      },
    ];

    service.getAll().subscribe((response) => {
      expect(response).toEqual({
        persons: mockPersons,
        totalCount: mockPersons.length,
      });
    });

    const request = httpTestingController.expectOne(service.API_URL);

    expect(request.request.method).toEqual('GET');

    request.flush(mockPersons, {
      headers: new HttpHeaders({ 'X-Total-Count': String(mockPersons.length) }),
    });
  });
});
