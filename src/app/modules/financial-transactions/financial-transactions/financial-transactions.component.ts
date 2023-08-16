import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { listOfColumn } from 'src/app/models/interfaces/listOfColumns.interface';
import { FinancialService } from 'src/app/services/financial.service';
import { FilterObject, GetSelectedFilters, ConstantFilterVariable } from '../../shared/components/filter/filter';

@Component({
  selector: 'app-financial-transactions',
  templateUrl: './financial-transactions.component.html',
  styleUrls: ['./financial-transactions.component.scss']
})
export class FinancialTransactionsComponent {

  searchFilter: any = {}
  filters: FilterObject[] = GetSelectedFilters([ConstantFilterVariable.customerName, ConstantFilterVariable.vendorName, ConstantFilterVariable.subledgervoucher, ConstantFilterVariable.transactionID, ConstantFilterVariable.account, ConstantFilterVariable.postingType, ConstantFilterVariable.journalCategory, ConstantFilterVariable.journalNumber,ConstantFilterVariable.description,ConstantFilterVariable.counterPartyVATCountry,ConstantFilterVariable.IsReportedVAT, ConstantFilterVariable.date])
  showFilter: boolean = false
  listOfColumn: Array<listOfColumn> = [
    { title: "", variable: '', compare: (a: any, b: any) => null, priority: false, width: '' },
    { title: 'Account', variable: 'account', compare: (a: any, b: any) => a.account < b.account ? 1 : -1, priority: true, width: '' },
    { title: 'Transaction Amount', variable: 'transactionAmount', compare: (a: any, b: any) => a.transactionAmount < b.transactionAmount ? 1 : -1, priority: true, width: '' },
    { title: 'Legal Entity', variable: 'legalEntity', compare: (a: any, b: any) => a.legalEntity < b.legalEntity ? 1 : -1, priority: true, width: '' },
    { title: 'Posting Type', variable: 'postingType', compare: (a: any, b: any) => a.postingType < b.postingType ? 1 : -1, priority: true, width: '' },
    { title: 'Journal Category', variable: 'journalCategory', compare: (a: any, b: any) => a.journalCategory < b.journalCategory ? 1 : -1, priority: true, width: '' },
    { title: 'Journal Number', variable: 'journalNumber', compare: (a: any, b: any) => a.journalNumber < b.journalNumber ? 1 : -1, priority: true, width: '' },
    { title: 'Subledger voucher', variable: 'subledgervoucher', compare: (a: any, b: any) => a.subledgervoucher < b.subledgervoucher ? 1 : -1, priority: true, width: '' },
    { title: 'Transaction Date', variable: 'transactionDate', compare: (a: any, b: any) => a.transactionDate < b.transactionDate ? 1 : -1, priority: true, width: '' },
    { title: 'Description', variable: 'description', compare: (a: any, b: any) => a.description < b.description ? 1 : -1, priority: true, width: '' },
    { title: 'Customer', variable: 'customer', compare: (a: any, b: any) => a.customer < b.customer ? 1 : -1, priority: true, width: '' },
    { title: 'vendor', variable: 'vendor', compare: (a: any, b: any) => a.vendor < b.vendor ? 1 : -1, priority: true, width: '' },
    { title: 'counter Party VAT Country', variable: 'counterPartyVATCountry', compare: (a: any, b: any) => a.counterPartyVATCountry < b.counterPartyVATCountry ? 1 : -1, priority: true, width: '' },
    { title: 'Is Reported VAT', variable: 'IsReportedVAT', compare: (a: any, b: any) => a.IsReportedVAT < b.IsReportedVAT ? 1 : -1, priority: true, width: '' },
  ]
  listOfData: Array<any> = [];
  pagination: any = {
    limit: 25,
    skip: 0,
    page:0,
  }



  constructor(
    private financialService: FinancialService
  ) {

  }

  ngOnInit(): void {
    this.getFInancialLogs()
  }
  pageSizeChange(value: any) {
    this.pagination.skip = 0;
    this.pagination.limit = value;
  }
  pageIndexChange(event: any) {
    this.pagination.page = (event - 1)
    this.pagination.skip = this.pagination.page * this.pagination.limit
    this.getFInancialLogs()
  }
  getFInancialLogs() {
    var search: any = {
      ...this.pagination,
      ...this.searchFilter,
      legalEntity: 'EEC'
    };
    this.financialService.getFinancialTransactions(search).subscribe((d: any) => {
      this.listOfData = d.financialTransactions
      this.pagination.count = d.count
    });
  }
  editStatus(transactionId: any, status: any) {
    console.log(status)
    // status = !status
    var obj = {
      transactionID: transactionId,
      IsReportedVAT: status
    }
    this.financialService.changeStatus(obj).pipe(take(1)).subscribe((d: any) => {
      if (d) {
        this.getFInancialLogs()
      }
    });
  }
  applyFilter($event) {
    this.searchFilter = $event;
    this.showFilter = false;
    this.pagination.skip =0
    this.getFInancialLogs();
  }

}
