import {Component} from '@angular/core';
import { SequenceService } from './sequence.service';
import { Sequence } from './models/sequence.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  game_width = 3;
  game_height = 3;
  game_interval = 3000;
  n = 2;
  game_length = 20 + this.n * this.n;
  match_sound_key = 'KeyS';
  match_position_key = 'KeyP';
  game_play = false;
  button_state = {
    sound: 'none',
    position: 'none'
  };
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
    this.new();
    sequenceService.onPositionMatchGuess((match) => {
      this.button_state.position = match ? 'correct' : 'wrong';
    });
    sequenceService.onSoundMatchGuess((match) => {
      this.button_state.sound = match ? 'correct' : 'wrong';
    });
    sequenceService.onNotePlayed(() => {
      this.button_state.sound = this.button_state.position = 'none';
    });
    sequenceService.onEnd((completed) => {
      this.button_state.sound = this.button_state.position = 'none';
      window.removeEventListener('keypress', this.keyPressEventListener);
      if (completed) {
        const records = sequenceService.getRecords();
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
    });
  }
  play() {
    this.game_play = true;
    this.sequenceService.playSequence(this.game_interval);
    window.addEventListener('keypress', this.keyPressEventListener.bind(this));
  }
  new() {
    this.sequenceService.initSequence(new Sequence(
      this.game_width,
      this.game_height,
      this.game_length,
      35,
      35,
      5,
      this.n));
  }
  keyPressEventListener(e) {
    switch (e.code) {
      case this.match_sound_key:
        this.sequenceService.matchSoundGuess();
        break;
      case this.match_position_key:
        this.sequenceService.matchPositionGuess();
        break;
    }
  }
}
