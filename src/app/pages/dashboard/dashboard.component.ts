import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  dateData: Array<Date>

  constructor() {
  }
  today = new Date();

  onChange(result: Array<Date>): void {

    result[0].setHours(0);
    result[0].setMinutes(0);
    result[0].setSeconds(0);

    result[1].setHours(23);
    result[1].setMinutes(59);
    result[1].setSeconds(59);

    this.dateData = result
  }

}
