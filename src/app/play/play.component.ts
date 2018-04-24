import { Component } from '@angular/core';
import { Sequence } from '../models/sequence.model';
import { SequenceService } from '../sequence.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent {

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

  constructor(public sequenceService: SequenceService, private router: Router) {
    this.new();
    this.play();
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
        router.navigate(['results']);
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
