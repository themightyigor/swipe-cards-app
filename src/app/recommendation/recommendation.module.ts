import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecommendationRoutingModule } from './recommendation-routing.module';
import { PersonCardComponent } from './person-card/person-card.component';
import { MatchDialogComponent } from './match-dialog/match-dialog.component';
import { RecommendationComponent } from './recommendation/recommendation.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    PersonCardComponent,
    MatchDialogComponent,
    RecommendationComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    RecommendationRoutingModule,
  ],
})
export class RecommendationModule {}
