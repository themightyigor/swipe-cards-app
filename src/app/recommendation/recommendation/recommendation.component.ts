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
  public isMatch = false;
  public match!: Match;
  public persons!: Person[];

  constructor(
    private recommendationService: RecommendationService,
    private matchService: MatchService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    forkJoin([
      this.recommendationService.getAll(),
      this.matchService.getOne(),
    ]).subscribe(([persons, match]) => {
      this.persons = persons;
      this.match = match;
    });
  }

  openMatchDialog(): void {
    this.dialog.open(MatchDialogComponent, {
      height: '200px',
      width: '400px',
    });
  }

  like(currentIndex: number, id: number): void {
    this.isMatch = this.match.likedBy.includes(id);

    if (this.isMatch) {
      this.openMatchDialog();

      return;
    }

    this.swipe(currentIndex);
  }

  swipe(currentIndex: number): void {
    if (currentIndex === this.persons.length - 1) {
      return;
    }

    this.isMatch = false;

    this.persons.forEach(
      (person, index) => (person.isVisible = index === currentIndex + 1)
    );
  }
}
