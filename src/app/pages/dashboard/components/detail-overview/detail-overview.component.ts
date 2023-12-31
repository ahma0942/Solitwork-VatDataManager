import { Component, Input, OnInit } from '@angular/core';
import { listOfColumn } from 'src/app/models/interfaces/listOfColumns.interface';
import { Pagination } from 'src/app/models/interfaces/pagination.interface';
import { DashboardService } from 'src/app/services/dashboard.service';
import { transactionsData } from 'src/assets/example_input_financial_transactions';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { VatTransactionDetailComponent } from '../vat-transaction-detail/vat-transaction-detail.component';
interface Transaction {
  subledgerVoucher?: string,
  account?: string,
  amount?: number,
  actual?: number,
  expected?: number,
  type?: string,
  category?: string,
  description?: string,
  customer?: string,
  vendor?: string,
  vatCountry?: string,
  manuCountry?: string,
  vatType?: string,
  date?: string
}
@Component({
  selector: 'app-detail-overview',
  templateUrl: './detail-overview.component.html',
  styleUrls: ['./detail-overview.component.scss']
})
export class DetailOverviewComponent implements OnInit {
  @Input("dateData") dateData: any
  fromDate: any
  toDate: any
  constructor(private dashboardService: DashboardService, private dialog: MatDialog,) {
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
    this.getTransactions()
  }
  ngOnInit(): void {
    // this.getTransactions()

  }
  listOfColumn: Array<listOfColumn> = [
    { title: "Subledger Voucher", variable: 'Subledgervoucher', compare: (a: any, b: any) => a.Subledgervoucher < b.Subledgervoucher ? 1 : -1, priority: true, width: '' },
    { title: 'Account', variable: 'Account', compare: (a: any, b: any) => a.Account < b.Account ? 1 : -1, priority: true, width: '' },
    { title: 'Amount', variable: 'TransactionAmount', compare: (a: any, b: any) => a.TransactionAmount < b.TransactionAmount ? 1 : -1, priority: true, width: '' },
    { title: 'Actual', variable: 'actual', compare: (a: any, b: any) => a.actual < b.actual ? 1 : -1, priority: true, width: '' },
    { title: 'Expected', variable: 'expected', compare: (a: any, b: any) => a.expected < b.expected ? 1 : -1, priority: true, width: '' },
    { title: 'Type', variable: 'PostingType', compare: (a: any, b: any) => a.PostingType < b.PostingType ? 1 : -1, priority: true, width: '' },
    { title: 'Cat', variable: 'JournalCategory', compare: (a: any, b: any) => a.JournalCategory < b.JournalCategory ? 1 : -1, priority: true, width: '' },
    { title: 'Description', variable: 'Description', compare: (a: any, b: any) => a.Description < b.Description ? 1 : -1, priority: true, class: 'w-20' },
    { title: 'Customer', variable: 'Customer', compare: (a: any, b: any) => a.Customer < b.Customer ? 1 : -1, priority: true, width: '' },
    { title: 'Vendor', variable: 'Vendor', compare: (a: any, b: any) => a.Vendor < b.Vendor ? 1 : -1, priority: true, width: '' },
    { title: 'VAT Country', variable: 'CounterPartyVATCountry', compare: (a: any, b: any) => a.CounterPartyVATCountry < b.CounterPartyVATCountry ? 1 : -1, priority: true, width: '' },
    { title: 'Manu Country', variable: 'manuCountry', compare: (a: any, b: any) => a.manuCountry < b.manuCountry ? 1 : -1, priority: true, width: '' },
    { title: 'VAT Type', variable: 'vatType', compare: (a: any, b: any) => a.vatType < b.vatType ? 1 : -1, priority: true, width: '' },
    { title: 'Date', variable: 'TransactionDate', compare: (a: any, b: any) => a.TransactionDate < b.TransactionDate ? 1 : -1, priority: true, width: '' },
  ]
  transactions: Array<any> = []
  pagination: Pagination = {
    limit: 25,
    skip: 0,
    page:0,
  }
  pageSizeChange(value: any) {
    this.pagination.skip = 0;
    this.pagination.limit = value;
  }
  pageIndexChange(event: any) {
    this.pagination.page = (event - 1)
    this.pagination.skip = this.pagination.page * this.pagination.limit
    this.getTransactions()
  }





  getTotalActual() {
    return this.transactions.map(t => t.actualVATAmount).reduce((acc: any, value: any) => acc + value, 0);
  }
  getTotalExpected() {
    return this.transactions.map(t => t.expectedVATAmount).reduce((acc: any, value: any) => acc + value, 0);
  }
  getTotalAmount() {
    return this.transactions.map(t => t.transactionAmount).reduce((acc: any, value: any) => acc + value, 0);
  }

  getTransactions() {
    var obj = {
      legalEntity: 'EEC',
      from_date: this.fromDate,
      to_date: this.toDate,
      ...this.pagination
    }
    this.dashboardService.getDetailOverview(obj).subscribe((d: any) => {
      this.transactions = d.vatTransactions
      this.pagination.count = d.count
    });
  }

  showDetail(data: any) {
    this.dialog.open(VatTransactionDetailComponent, {
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
