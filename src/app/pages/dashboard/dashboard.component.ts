import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  dateData: Array<Date>=[];

  constructor() {}
  today = new Date();

  onChange(result: Date): void {
    let fromDate = new Date(result.getFullYear(), 0, 1);
    let toDate = new Date(result.getFullYear(), 11, 31);
    toDate.setHours(23);
    toDate.setMinutes(59);
    toDate.setSeconds(59);
    this.dateData = [fromDate, toDate];
  }
}
