import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecommendationComponent } from './recommendation/recommendation.component';

const routes: Routes = [
  { path: '', redirectTo: 'recommendations', pathMatch: 'full' },
  {
    path: 'recommendations',
    component: RecommendationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecommendationRoutingModule {}
