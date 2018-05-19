import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../game.service';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public lineChartData:Array<any> = [];
  public lineChartLabels:Array<any> = [];
  public lineChartOptions:any = {
    responsive: true,
    elements : {
      line: {
        borderWidth: 1,
      },
    },
    legend : {
      labels: {
        fontColor: '#4A90E2'
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: '#50E3C2',
        },
        gridLines: {
          display: false
        },
      }],
      xAxes: [{
        ticks: {
          fontColor: '#50E3C2',
        },
        gridLines: {
          display: false
        },
      }]
    }
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'transparent',
      borderColor: '#4A90E2',
      pointBackgroundColor: '#4A90E2',
      pointBorderColor: '#50E3C2',
      pointHoverBackgroundColor: '#50E3C2',
      pointHoverBorderColor: '#50E3C2'
    },
    { // grey
      backgroundColor: 'transparent',
      borderColor: '#2c598a',
      pointBackgroundColor: '#4A90E2',
      pointBorderColor: '#50E3C2',
      pointHoverBackgroundColor: '#50E3C2',
      pointHoverBorderColor: '#50E3C2'
    },
    { // grey
      backgroundColor: 'transparent',
      borderColor: '#1a3554',
      pointBackgroundColor: '#4A90E2',
      pointBorderColor: '#50E3C2',
      pointHoverBackgroundColor: '#50E3C2',
      pointHoverBorderColor: '#50E3C2'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  constructor(private router: Router, public gameService: GameService) {
    if (gameService.days_records.length) {
      const last_day = moment(gameService.days_records[gameService.days_records.length - 1].date);
      const first_day = moment(gameService.days_records[0].date);
      const DM1 = last_day.clone().subtract(1, 'M');
      const i_day = DM1.isAfter(first_day) ? DM1 : first_day.clone();
      const average_n = [];
      const max_n = [];
      const min_n = [];
      let found_date: boolean;
      while (i_day.format('DD/MM/YYYY') <= last_day.format('DD/MM/YYYY')) {
        found_date = false;
        this.lineChartLabels.push(i_day.format('DD/MM'));
        for (const day_record of gameService.days_records) {
          console.log(moment(day_record.date).format('DD/MM/YYYY'));
          if (moment(day_record.date).format('DD/MM/YYYY') === i_day.format('DD/MM/YYYY')) {
            found_date = true;
            average_n.push(day_record.average_n);
            max_n.push(day_record.max_n);
            min_n.push(day_record.min_n);
            break;
          }
        }
        if (!found_date) {
          average_n.push(null);
          max_n.push(null);
          min_n.push(null);
        }
        i_day.add(1, 'd');
      }
      this.lineChartData = [
        {data: average_n, label: 'Average N', spanGaps: true},
        {data: max_n, label: 'Maximum N', spanGaps: true},
        //{data: min_n, label: 'Minimum N', spanGaps: true},
      ];
    } else {
      // No data
    }


  }

  ngOnInit() {

  }

  play() {
    this.router.navigate(['play']);
  }

}
