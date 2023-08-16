import { Component, Input, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import * as moment from 'moment';

@Component({
  selector: 'app-kpis',
  templateUrl: './kpis.component.html',
  styleUrls: ['./kpis.component.scss']
})
export class KpisComponent implements OnInit {
  @Input("dateData") dateData: any
  // fromDate:any=sessionStorage.getItem('dateValue')?JSON.parse(sessionStorage.getItem('dateValue')):new Date().toISOString()
  // toDate:any= new Date().toISOString()
  fromDate: any
  toDate: any

  kpiData: any[] = [];
  constructor(private dashboardService: DashboardService) {
    if (sessionStorage.getItem('dateValue')) {
      var dateResult = JSON.parse(sessionStorage.getItem('dateValue'))
      this.fromDate = dateResult[0]
      this.toDate = dateResult[1]
    } else {
      this.fromDate = moment(new Date()).format('yyyy-MM-DDTHH:mm:ss')
      this.toDate = moment(new Date()).format('yyyy-MM-DDTHH:mm:ss')
    }
  }
  ngOnChanges() {
    if (this.dateData) {
      this.fromDate = this.dateData[0]
      this.toDate = this.dateData[1]
    }
    this.getkpi()
  }
  ngOnInit(): void {
    // this.getkpi();
  }

  getkpi() {
    var obj = {
      from_date: this.fromDate,
      to_date: this.toDate
    }
    this.dashboardService.getKpiData(obj).subscribe((d: any) => {
      this.kpiData = d
    });
  }
  getDataValue(id: any) {
    debugger
    return this.kpiData?.find((data: any) => data.id == id)
  }
}
