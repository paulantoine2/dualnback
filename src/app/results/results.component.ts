import { Component, OnInit } from '@angular/core';
import { SequenceService } from '../sequence.service';
import { GameRecord } from '../models/game-record.model';
import { GameService } from '../game.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  game_record: GameRecord;

  constructor(public sequenceService: SequenceService, public gameService: GameService) {
    this.game_record = new GameRecord(gameService.getN(), sequenceService.getRecords());
    gameService.addToGamesRecords(this.game_record);
    gameService.buildDayRecord();
    gameService.save();
  }

  ngOnInit() {
  }

}
