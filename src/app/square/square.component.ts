import { Component, Input } from '@angular/core';
import { state, style, trigger, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css'],
  animations: [
    trigger('light', [
      state('off', style({
        backgroundColor: '#09192A',
      })),
      state('on', style({
        backgroundColor: '#50E3C2'
      })),
      transition('off => on', animate('300ms ease')),
      transition('on => off', animate('1000ms ease'))
    ])
  ]
})
export class SquareComponent {
  @Input() light: boolean;

  constructor() { }

}
