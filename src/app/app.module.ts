import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts';
import { NgModule } from '@angular/core';

import { routes } from './app.routing';

import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';
import { SquareComponent } from './square/square.component';
import { SequenceService } from './sequence.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { PlayComponent } from './play/play.component';
import { ResultsComponent } from './results/results.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { RouterModule } from '@angular/router';
import { GameService } from './game.service';


@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    SquareComponent,
    HomeComponent,
    PlayComponent,
    ResultsComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    ChartsModule
  ],
  providers: [
    SequenceService,
    GameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
