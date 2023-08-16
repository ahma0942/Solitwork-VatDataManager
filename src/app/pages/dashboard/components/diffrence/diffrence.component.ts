import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import * as moment from 'moment';
import { listOfColumn } from 'src/app/models/interfaces/listOfColumns.interface';
import { Pagination } from 'src/app/models/interfaces/pagination.interface';
import { DashboardService } from 'src/app/services/dashboard.service';
import { UpdateDifferenceTransactionComponent } from '../update-difference-transaction/update-difference-transaction.component';
import { DifferenceDetailComponent } from '../difference-detail/difference-detail.component';
import { AddVerificationComponent } from '../add-verification/add-verification.component';

interface Transaction {
  differenceId?: string;
  actualVATAmount?: number;
  expectedVATAmount?: number;
  differenceVATAmount?: number;
  status?: boolean;
  attachment?: number;
  vatJournal?: string;
  verifications?:Array<any>;
}
@Component({
  selector: 'app-diffrence',
  templateUrl: './diffrence.component.html',
  styleUrls: ['./diffrence.component.scss'],
})
export class DiffrenceComponent implements OnInit {
  @Input("dateData") dateData: any
  fromDate: any
  toDate: any
  displayedColumns: string[] = ['voucher', 'actual', 'expected', 'difference', 'checkbox', 'attachment', 'vatJournal'];
  transactions: Transaction[] = [];
  updatedtransactions: any[] = []
  checked: boolean = false

  listOfColumn: Array<listOfColumn> = [
    { title: "Voucher", variable: 'differenceId', compare: (a: any, b: any) => a.differenceId < b.differenceId ? 1 : -1, priority: true, width: '' },
    { title: "Actual", variable: 'actualVATAmount', compare: (a: any, b: any) => a.actualVATAmount < b.actualVATAmount ? 1 : -1, priority: true, width: '' },
    { title: "Expected", variable: 'expectedVATAmount', compare: (a: any, b: any) => a.expectedVATAmount < b.expectedVATAmount ? 1 : -1, priority: true, width: '' },
    { title: "Difference", variable: 'differenceVATAmount', compare: (a: any, b: any) => a.differenceVATAmount < b.differenceVATAmount ? 1 : -1, priority: true, width: '' },
    { title: "checkbox", variable: 'checbox', priority: true, width: '' },
    { title: "Attach File", variable: 'attachment', priority: true, width: '' },
    { title: "VAT Journal", variable: 'vatJournal', priority: true, width: '' },
    { title: "Status", variable: 'status', priority: true, width: '' },
    { title: "Action", variable: 'action', priority: true, width: '' },


  ]
  pagination: Pagination = {
    limit: 8,
    skip: 0,
    page:0,
  }
  pageSizeChange(value: any) {
    this.pagination.skip = 0;
    this.pagination.limit = value;
  }
  pageIndexChange(event: any) {
    this.pagination.page = (event -1)
    this.pagination.skip = this.pagination.page*this.pagination.limit;
    this.getTransaction()
  }
  constructor(private dashboardService: DashboardService, private dialog: MatDialog) {

  }
  ngOnChanges() {
    if (sessionStorage.getItem('dateValue')) {
      var dateResult = JSON.parse(sessionStorage.getItem('dateValue'))
      this.fromDate = dateResult[0]
      this.toDate = dateResult[1]
    } else {
      this.fromDate = moment(new Date()).format('yyyy-MM-DDTHH:mm:ss')
      this.toDate = moment(new Date()).format('yyyy-MM-DDTHH:mm:ss')
    }
    this.getTransaction()
  }
  ngOnInit(): void {
    // this.getTransaction()

  }
  getTotalActual() {
    return this.updatedtransactions.map(t => t.actualVATAmount).reduce((acc: any, value: any) => acc + value, 0);
  }
  getTotalExpected() {
    return this.updatedtransactions.map(t => t.expectedVATAmount).reduce((acc: any, value: any) => acc + value, 0);
  }
  getTotalDifference() {
    return this.updatedtransactions.map(t => t.differenceVATAmount).reduce((acc: any, value: any) => acc + value, 0);
  }
  getTransaction() {
    var obj = {
      from_date: this.fromDate,
      to_date: this.toDate,
      ...this.pagination,
      legalEntity: 'EEC'
    }
    this.dashboardService.getDifferenceData(obj).subscribe((d: any) => {
      if (d) {
        this.transactions = d.differences
        this.pagination.count = d.count
        this.updatedtransactions = this.transactions?.map((obj) => {
          const differenceVATAmount = obj.expectedVATAmount - obj.actualVATAmount;
          return { ...obj, differenceVATAmount };
        })
        console.log(this.updatedtransactions)
      }
    });
  }
  deleteVatRate(data:any){
    var obj = {
      verificationId:data.verifications[0].verificationId
    }
    this.dashboardService.deleteDifference(obj.verificationId).subscribe((d: any) => {
      this.getTransaction()
    });
  }
  addVerification(data){
    this.dialog.open(AddVerificationComponent, {
      autoFocus: false,
      data:data,
      minWidth: "600px",
      minHeight: '300px',
      maxHeight: "85vh",
      disableClose: true,
    }).afterClosed().subscribe(action => {
      if (action) {
        console.log(action)
        this.getTransaction()
      }
    });
  }
  updateFile(data) {
    this.dialog.open(UpdateDifferenceTransactionComponent, {
      autoFocus: false,
      data: data,
      minWidth: "600px",
      minHeight: '300px',
      maxHeight: "85vh",
      disableClose: true,
    }).afterClosed().subscribe(action => {
      if (action) {
        console.log(action)
        this.getTransaction()
      }
    });
  }
  showDetail(data: any) {
    this.dialog.open(DifferenceDetailComponent, {
      autoFocus: false,
      data: data,
      minWidth: "60%",
      minHeight: '80vh',
      maxHeight: "85vh",
      disableClose: false,
    }).afterClosed().subscribe(action => {
      if (action) {
        console.log(action)
      }
    });
  }
}
