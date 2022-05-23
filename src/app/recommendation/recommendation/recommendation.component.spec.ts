import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { cold, getTestScheduler } from 'jasmine-marbles';

import { RecommendationComponent } from './recommendation.component';
import { PersonCardComponent } from '../person-card/person-card.component';

import { RecommendationService } from 'src/app/services/recommendation.service';
import { Match } from 'src/app/models/match.model';
import { Person } from 'src/app/models/person.model';
import { MatchService } from 'src/app/services/match.service';

describe('RecommendationComponent', () => {
  let component: RecommendationComponent;
  let fixture: ComponentFixture<RecommendationComponent>;
  let element: DebugElement;
  let matchService: MatchService;
  let recommendationService: RecommendationService;

  const matDialogSpyObj = jasmine.createSpyObj('MatDialog', ['open']);

  const mockMatch: Match = {
    id: 1,
    likedBy: [2, 3],
  };
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
      ],
      providers: [
        MatchService,
        RecommendationService,
        { provide: MatDialog, useValue: matDialogSpyObj },
      ],
      declarations: [RecommendationComponent, PersonCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;

    matchService = TestBed.inject(MatchService);
    recommendationService = TestBed.inject(RecommendationService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      spyOn(recommendationService, 'getAll').and.callFake(() =>
        cold('a|', {
          a: { persons: mockPersons, totalCount: mockPersons.length },
        })
      );
      spyOn(matchService, 'getOne').and.callFake(() =>
        cold('a|', { a: mockMatch })
      );
      component.ngOnInit();
      getTestScheduler().flush();
    });

    it('should retrieve recommended persons', () => {
      expect(recommendationService.getAll).toHaveBeenCalled();
    });

    it('should retrieve match', () => {
      expect(matchService.getOne).toHaveBeenCalled();
    });

    it('should set appropriate number of persons', () => {
      expect(component.personsTotalCount).toBe(mockPersons.length);
    });
  });

  describe('when person receive like', () => {
    let likeButton: HTMLButtonElement;

    beforeEach(() => {
      component.currentPerson = mockPersons[0];
      component.persons = mockPersons;
      component.personsTotalCount = mockPersons.length;
      component.match = mockMatch;

      likeButton = element.query(
        By.css('[data-marker="like-button"]')
      ).nativeElement;
    });

    it('should render the next person card, when no match', () => {
      likeButton.click();
      fixture.detectChanges();

      const personName = element
        .query(By.css('[data-marker="person-name"]'))
        .nativeElement.textContent.trim();

      expect(personName).toBe('Samantha');
    });

    it('should open dialog, when match', () => {
      component.currentPerson = mockPersons[1];

      likeButton.click();
      fixture.detectChanges();

      expect(matDialogSpyObj.open).toHaveBeenCalled();
    });

    it('should disable the like button, if last person is presented', () => {
      component.isLastPerson = true;

      likeButton.click();
      fixture.detectChanges();

      expect(likeButton.hasAttribute('disabled')).toBeTruthy();
    });
  });
});
