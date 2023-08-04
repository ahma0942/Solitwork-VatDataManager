import { Component, Input, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import * as moment from 'moment';

@Component({
  selector: 'app-kpis',
  templateUrl: './kpis.component.html',
  styleUrls: ['./kpis.component.scss']
})
export class KpisComponent implements OnInit {
  @Input("dateData") dateData:any
  fromDate:any=new Date().toISOString()
  toDate:any= new Date().toISOString()

  kpiData:any[] = [];
  constructor(private dashboardService:DashboardService) {

  }
  ngOnChanges(){
    if(this.dateData){
      this.fromDate = moment(this.dateData[0]).format('yyyy-MM-DDTHH:mm:ss')
    this.toDate = moment(this.dateData[1]).format('yyyy-MM-DDTHH:mm:ss')
    }
    this.getkpi()
  }
  ngOnInit(): void {
    this.getkpi();
  }

  getkpi(){
    var obj ={
      from_date:this.fromDate,
      to_date:this.toDate
    }
    this.dashboardService.getKpiData(obj).subscribe((d:any)=>{
      this.kpiData = d
    });
  }
  getDataValue(id:any){
    debugger
    return this.kpiData?.find((data:any)=> data.id == id)
  }
}
