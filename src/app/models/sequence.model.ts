import { Note } from './note.model';

export class Sequence {
  notes: Note[];
  constructor(
    private width: number,
    private height: number,
    private length: number,
    private position_match: number,
    private sound_match: number,
    private match_granularity: number,
    public n: number
    ) {
    this.notes = [];
    // Build first a totally random sequence
    for (let i = 0 ; i < length ; i++) {
      const sounds = ['l', 'p', 'q' , 'k', 'r', 'c', 't'];
      const x = Math.floor(Math.random() * width);
      const y = Math.floor(Math.random() * height);
      const sound_index = Math.floor(Math.random() * sounds.length);
      this.notes.push(new Note(x, y, sounds[sound_index]));
    }

    // Get number of matchs wanted
    const min_position_matches = length / 100 * (position_match - match_granularity);
    const max_position_matches = length / 100 * (position_match + match_granularity);
    const min_sound_matches = length / 100 * (sound_match - match_granularity);
    const max_sound_matches = length / 100 * (sound_match + match_granularity);

    const total_sound_match = this.randomIntFromInterval(min_sound_matches, max_sound_matches);
    const total_position_match = this.randomIntFromInterval(min_position_matches, max_position_matches);

    let n_sound_match = this.getSoundMatches();
    let n_position_match = this.getPositionMatches();

    // while (n_sound_match < total_sound_match && n_position_match < total_position_match) {
    //   const random_index = this.randomIntFromInterval(n, length);
    //   const random_type = this.randomIntFromInterval(0, 1) ? 'sound' : 'position';
    //
    // }
  }

  private randomIntFromInterval (min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  private getSoundMatches () {
    let res = 0;
    for (let i = this.n ; i < this.length ; i++) {
      if (this.indexMatch(i) === 'sound') {
        res++;
      }
    }
    return res;
  }
  private getPositionMatches () {
    let res = 0;
    for (let i = this.n ; i < this.length ; i++) {
      if (this.indexMatch(i) === 'position') {
        res++;
      }
    }
    return res;
  }
  private indexMatch (i) {
    if (i >= this.n) {
      if (this.notes[i].x === this.notes[i - this.n].x &&
        this.notes[i].y === this.notes[i - this.n].y) {
        return 'position';
      } else if (this.notes[i].sound === this.notes[i - this.n].sound) {
        return 'sound';
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
