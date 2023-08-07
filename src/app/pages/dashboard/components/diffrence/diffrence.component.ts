import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import * as moment from 'moment';
import { DashboardService } from 'src/app/services/dashboard.service';

interface Transaction {
  voucher?: string;
  actual?: number;
  expected?:number;
  difference?:number;
  status?:boolean;
  attachment?:number;
  vatJournal?:string;
}
@Component({
  selector: 'app-diffrence',
  templateUrl: './diffrence.component.html',
  styleUrls: ['./diffrence.component.scss'],
})
export class DiffrenceComponent implements OnInit{
  @Input("dateData") dateData:any
  fromDate:any
  toDate:any
  displayedColumns: string[] = ['voucher', 'actual','expected','difference','checkbox','attachment','vatJournal'];
  transactions: Transaction[] = [];

  constructor(private dashboardService:DashboardService){

  }
  ngOnChanges(){
    if(sessionStorage.getItem('dateValue')){
      var dateResult = JSON.parse(sessionStorage.getItem('dateValue'))
      this.fromDate = dateResult[0]
      this.toDate = dateResult[1]
    }else{
      this.fromDate = moment(new Date()).format('yyyy-MM-DDTHH:mm:ss')
      this.toDate = moment(new Date()).format('yyyy-MM-DDTHH:mm:ss')
    }
    this.getTransaction()
  }
  ngOnInit(): void {
    this.getTransaction()

  }
  getTotalActual() {
    return this.transactions.map(t => t.actual).reduce((acc:any, value:any) => acc + value, 0);
  }
  getTotalExpected() {
    return this.transactions.map(t => t.expected).reduce((acc:any, value:any) => acc + value, 0);
  }
  getTotalDifference() {
    return this.transactions.map(t => t.difference).reduce((acc:any, value:any) => acc + value, 0);
  }
  getTransaction(){
    var obj ={
      from_date:this.fromDate,
      to_date:this.toDate,
     limit:8,
     legalEntity:'EEC'
    }
    this.dashboardService.getDifferenceData(obj).subscribe((d:any)=>{
      this.transactions = d.vatTransactions
    });
  }
}
