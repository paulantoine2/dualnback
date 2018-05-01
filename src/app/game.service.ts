import { DayRecord } from './models/day-record.model';
import { GameRecord } from './models/game-record.model';

const DEFAULT_N = 2;
const DEFAULT_WIDTH = 3;
const DEFAULT_HEIGHT = 3;
const DEFAULT_INTERVAL = 3000;

export class GameService {
  private n: number;
  public width: number;
  public height: number;
  public interval: number;
  public length: number;
  public games_records: GameRecord[];
  private games_records_date: Date;
  public days_records: DayRecord[];

  constructor () {
    this.n = parseInt(localStorage.getItem('game_n'), 10) || DEFAULT_N;
    this.width = parseInt(localStorage.getItem('game_width'), 10) || DEFAULT_WIDTH;
    this.height = parseInt(localStorage.getItem('game_height'), 10) || DEFAULT_HEIGHT;
    this.interval = parseInt(localStorage.getItem('game_interval'), 10) || DEFAULT_INTERVAL;
    this.setLength(2);
    this.days_records = JSON.parse(localStorage.getItem('days_records')) || [];

    const saved_date = localStorage.getItem('games_records_date');
    if (saved_date) {
      const saved_date_formatted = new Date(saved_date);
      if (saved_date_formatted.getDate() !== new Date().getDate()) {
        localStorage.removeItem('games_records');
      } else {
        this.games_records_date = new Date(saved_date);
      }
    } else {
      this.games_records_date = new Date();
      localStorage.setItem('games_records_date', this.games_records_date.toString());
    }
    this.games_records = JSON.parse(localStorage.getItem('games_records')) || [];
    console.log(this.games_records);
  }

  static sameDay(d1: Date, d2: Date) {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  }

  getN () {
    return this.n;
  }

  setN (n) {
    this.n = n;
    this.setLength();
  }

  save () {
    localStorage.setItem('game_n', this.n.toString());
    localStorage.setItem('game_width', this.width.toString());
    localStorage.setItem('game_height', this.height.toString());
    localStorage.setItem('game_interval', this.interval.toString());
    localStorage.setItem('games_records', JSON.stringify(this.games_records));
    localStorage.setItem('days_records', JSON.stringify(this.days_records));
  }

  addToGamesRecords (record: GameRecord) {
    this.games_records.push(record);
  }

  buildDayRecord () {
    const day_record = new DayRecord(
      new Date(),
      this.getDayMaxN(),
      this.getDayMinN(),
      this.getDayAverageN(),
      this.getDayMaxScore(),
      this.getDayMinScore(),
      this.getDayAverageScore(),
      this.games_records.length
    );
    if (this.days_records.length > 0 && GameService.sameDay(new Date(this.days_records[this.days_records.length - 1].date), new Date(day_record.date))) {
      this.days_records[this.days_records.length - 1] = day_record;
    } else {
      this.days_records.push(day_record);
    }
  }

  private setLength (length?: number) {
    if (length) {
      this.length = length;
    } else {
      this.length = 20 + this.n * this.n;
    }
  }

  private getDayMaxN () {
    let max = 0;
    this.games_records.forEach((record, index) => {
      if (record.n > max) { max = record.n; }
    });
    return max;
  }

  private getDayMinN () {
    let min = this.getDayMaxN();
    this.games_records.forEach((record, index) => {
      if (record.n < min) { min = record.n; }
    });
    return min;
  }

  private getDayAverageN () {
    let total = 0;
    this.games_records.forEach((record, index) => {
      total += record.n;
    });
    return parseFloat((total / this.games_records.length).toPrecision(2));
  }

  private getDayMaxScore () {
    let max = 0;
    this.games_records.forEach((record, index) => {
      if (record.score > max) { max = record.n; }
    });
    return max;
  }

  private getDayMinScore () {
    let min = this.getDayMaxScore();
    this.games_records.forEach((record, index) => {
      if (record.score < min) { min = record.score; }
    });
    return min;
  }

  private getDayAverageScore () {
    let total = 0;
    this.games_records.forEach((record, index) => {
      total += record.score;
    });
    return parseFloat((total / this.games_records.length).toPrecision(2));
  }
}
