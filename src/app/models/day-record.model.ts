export class DayRecord {
  constructor (
    public date: Date,
    public max_n: number,
    public min_n: number,
    public average_n: number,
    public max_score: number,
    public min_score: number,
    public average_score: number,
    public games: number
  ) {}
}
