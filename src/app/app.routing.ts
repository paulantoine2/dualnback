import { Routes } from '@angular/router';
import { PlayComponent } from './play/play.component';
import { HomeComponent } from './home/home.component';
import { ResultsComponent } from './results/results.component';
import { StatisticsComponent } from './statistics/statistics.component';

export const routes: Routes = [
  { path: '',            component: HomeComponent},
  { path: 'play',           component: PlayComponent},
  { path: 'results',             component: ResultsComponent},
  { path: 'statistics',             component: StatisticsComponent},
];
