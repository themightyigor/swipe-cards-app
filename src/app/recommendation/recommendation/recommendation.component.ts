import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';

import { Match } from 'src/app/models/match.model';
import { MatchDialogComponent } from '../match-dialog/match-dialog.component';
import { MatchService } from 'src/app/services/match.service';
import { Person } from 'src/app/models/person.model';
import { RecommendationService } from 'src/app/services/recommendation.service';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.scss'],
})
export class RecommendationComponent implements OnInit {
  public currentId = 0;
  public currentPerson!: Person;
  public isLastPerson = false;
  public isLikeDisabled = false;
  public isMatch = false;
  public match!: Match;
  public persons!: Person[];
  public personsTotalCount!: number;

  constructor(
    private recommendationService: RecommendationService,
    private matchService: MatchService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    forkJoin([
      this.recommendationService.getAll(),
      this.matchService.getOne(),
    ]).subscribe(([recommendations, match]) => {
      const { persons, totalCount } = recommendations;

      //@ts-ignore
      this.persons = persons;
      this.currentPerson = this.persons[this.currentId];
      this.personsTotalCount = totalCount;
      this.match = match;
    });
  }

  openMatchDialog(): void {
    this.dialog.open(MatchDialogComponent, {
      height: '200px',
      width: '400px',
    });
  }

  like(): void {
    this.isMatch = this.match.likedBy.includes(this.currentPerson.id);

    if (this.isMatch) {
      this.openMatchDialog();

      return;
    }

    if (this.isLastPerson) {
      this.isLikeDisabled = true;

      return;
    }

    this.swipe();
  }

  swipe(): void {
    this.currentId++;
    this.currentPerson = this.persons[this.currentId];
    this.isMatch = false;
    this.isLastPerson = this.currentId === this.personsTotalCount - 1;
  }
}
