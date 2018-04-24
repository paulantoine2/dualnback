import { Component, OnInit } from '@angular/core';
import { SequenceService } from '../sequence.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  results = {
    sound: {
      correct: 0,
      wrong: 0,
      percentage: 0
    },
    position: {
      correct: 0,
      wrong: 0,
      percentage: 0
    },
    score: 0
  };

  constructor(public sequenceService: SequenceService) {
    const records = sequenceService.getRecords();
    if (records) {
      for (const trial of records) {
        if (trial.sound_match && trial.user_match_sound) {
          this.results.sound.correct++;
        }
        if (trial.position_match && trial.user_match_position) {
          this.results.position.correct++;
        }
        if ((!trial.position_match && trial.user_match_position) || (trial.position_match && !trial.user_match_position)) {
          this.results.sound.wrong++;
        }
        if ((!trial.sound_match && trial.user_match_sound) || (trial.sound_match && !trial.user_match_sound)) {
          this.results.position.wrong++;
        }
      }
      const sound_total = this.results.sound.correct + this.results.sound.wrong;
      const position_total = this.results.position.correct + this.results.position.wrong;
      const correct_total = this.results.position.correct + this.results.sound.correct;
      if (sound_total > 0) {
        this.results.sound.percentage = Math.round(this.results.sound.correct / sound_total * 100);
      }
      if (position_total > 0) {
        this.results.position.percentage = Math.round(this.results.position.correct / position_total * 100);
      }
      if (position_total + sound_total > 0) {
        this.results.score = Math.round(correct_total / (sound_total + position_total) * 100);
      }
    }
  }

  ngOnInit() {
  }

}
