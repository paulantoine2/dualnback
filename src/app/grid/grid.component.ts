import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { SequenceService } from '../sequence.service';
import { GameService } from '../game.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit, AfterViewInit {
  @Input() width: number;
  @Input() height: number;
  @Input() indexToLight: number;
  @ViewChild('container') container: ElementRef;
  squares: any[];

  constructor(public sequenceService: SequenceService, private gameService: GameService) {
    sequenceService.onNotePlayed((note) => {
      const position = note.y * this.width + note.x;
      this.squares[position].light = true;
      setTimeout(() => {
        this.squares[position].light = false;
      }, gameService.interval / 2);
    });
  }

  ngOnInit() {
    this.squares = [];
    for (let size = 0 ; size < this.width * this.height; size++) {
      this.squares.push({light: false});
    }
  }

  ngAfterViewInit() {
    this.container.nativeElement.style.gridTemplateColumns = `repeat(${this.width}, 1fr)`;
    this.container.nativeElement.style.gridTemplateRows = `repeat(${this.height}, 1fr)`;
  }

}
