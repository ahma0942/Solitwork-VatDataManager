import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  dateData: Array<Date>;
  today :Array<Date>;

  constructor() {
    this.today = [new Date(), new Date()]
  }


  onChange(result: Array<Date>): void {
    // let fromDate = new Date(result.getFullYear(), 0, 1);
    // let toDate = new Date(result.getFullYear(), 11, 31);
    // toDate.setHours(23);
    // toDate.setMinutes(59);
    // toDate.setSeconds(59);
   if(result){
    result[0]?.setHours(0);
    result[0]?.setMinutes(0);
    result[0]?.setSeconds(0);
    result[1]?.setHours(23);
    result[1]?.setHours(59);
    result[1]?.setHours(50);
    this.dateData = result;
   }
  }
}
