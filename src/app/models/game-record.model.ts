export class GameRecord {
  public score = 0;
  public position = {
    correct: 0,
    wrong: 0,
    percentage: 0
  };
  public sound = {
    correct: 0,
    wrong: 0,
    percentage: 0
  };
  public n: number;

  constructor (n: number, sequence_records?: any[]) {
    this.n = n;
    if (sequence_records) {
      for (const trial of sequence_records) {
        if (trial.sound_match && trial.user_match_sound) {
          this.sound.correct++;
        }
        if (trial.position_match && trial.user_match_position) {
          this.position.correct++;
        }
        if ((!trial.position_match && trial.user_match_position) || (trial.position_match && !trial.user_match_position)) {
          this.sound.wrong++;
        }
        if ((!trial.sound_match && trial.user_match_sound) || (trial.sound_match && !trial.user_match_sound)) {
          this.position.wrong++;
        }
      }
      const sound_total = this.sound.correct + this.sound.wrong;
      const position_total = this.position.correct + this.position.wrong;
      const correct_total = this.position.correct + this.sound.correct;
      if (sound_total > 0) {
        this.sound.percentage = Math.round(this.sound.correct / sound_total * 100);
      }
      if (position_total > 0) {
        this.position.percentage = Math.round(this.position.correct / position_total * 100);
      }
      if (position_total + sound_total > 0) {
        this.score = Math.round(correct_total / (sound_total + position_total) * 100);
      }
    }
  }
}
