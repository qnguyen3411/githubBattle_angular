import { NgModule } from '@angular/core';
import { BattleComponent } from './battle/battle.component'
import { RankingsComponent } from './rankings/rankings.component'
import { ResultsComponent } from './results/results.component'
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: BattleComponent },
  { path: 'rankings', component: RankingsComponent },
  { path: 'results', component: ResultsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
