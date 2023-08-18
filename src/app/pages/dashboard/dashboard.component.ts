import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  dateData: string[];
  today: Array<Date>;

  constructor() {
    if (sessionStorage.getItem("dateValue")) {
      console.log('session')
      this.today = JSON.parse(sessionStorage.getItem('dateValue'))
    } else {
      console.log('today')
      this.today = [new Date(), new Date()]
      this.onChange(this.today)
    }
  }


  onChange(result: Array<Date>): void {
    if (result) {
      result[0]?.setHours(0);
      result[0]?.setMinutes(0);
      result[0]?.setSeconds(0);
      var fromDate = moment(result[0]).format('yyyy-MM-DDTHH:mm:ss')

      result[1]?.setHours(23);
      result[1]?.setMinutes(59);
      result[1]?.setSeconds(59);
      var toDate = moment(result[1]).format('yyyy-MM-DDTHH:mm:ss')
      this.dateData = [fromDate, toDate];
      sessionStorage.setItem('dateValue', JSON.stringify(this.dateData))
    }
  }
}
