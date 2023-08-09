import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { listOfColumn } from 'src/app/models/interfaces/listOfColumns.interface';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { AddEditVatRatesComponent } from '../../../add-edit-vat-rates/add-edit-vat-rates.component';

@Component({
  selector: 'app-vat-rates',
  templateUrl: './vat-rates.component.html',
  styleUrls: ['./vat-rates.component.scss']
})
export class VatRatesComponent implements OnInit {
  listOfColumn: Array<listOfColumn> = [
    { title: "", variable: '', compare: (a: any, b: any) => null, priority: false, width: '' },
    { title: 'Journal Category', variable: 'vatRateID', compare: (a: any, b: any) => a.vatRateID < b.vatRateID ? 1 : -1, priority: true, width: '' },
    { title: 'Legal Entity', variable: 'legalEntity', compare: (a: any, b: any) => a.legalEntity < b.legalEntity ? 1 : -1, priority: true, width: '' },
    { title: 'Account', variable: 'account', compare: (a: any, b: any) => a.account < b.account ? 1 : -1, priority: true, width: '' },
    { title: 'expected VAT Type', variable: 'expectedVATType', compare: (a: any, b: any) => a.expectedVATType < b.expectedVATType ? 1 : -1, priority: true, width: '' },
    { title: 'Expected VAT Rate', variable: 'expectedVATRate', compare: (a: any, b: any) => a.expectedVATRate < b.expectedVATRate ? 1 : -1, priority: true, width: '' },

    { title: 'Valid From', variable: 'validfrom', compare: (a: any, b: any) => a.validfrom < b.validfrom ? 1 : -1, priority: true, width: '' },
    { title: 'Valid To', variable: 'validto', compare: (a: any, b: any) => a.validto < b.validto ? 1 : -1, priority: true, width: '' },
    { title: 'Action', variable: 'action', priority: true, width: '' },
  ]
  listOfData: Array<any> = [];
  pagination: any = {
    limit: 25,
    skip: 0,
  }



  constructor(private configurationService: ConfigurationService, private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.getVatRateData()
  }
  pageSizeChange(value: any) {
    this.pagination.skip = 0;
    this.pagination.limit = value;
  }
  pageIndexChange(event: any) {
    this.pagination.skip = event - 1;
  }
  getVatRateData() {
    var obj = {
      ...this.pagination
    }
    this.configurationService.getVatRates(obj).subscribe((d: any) => {
      this.listOfData = d.vatrates
    });
  }
  create() {
    this.dialog.open(AddEditVatRatesComponent, {
      autoFocus: false,
      minWidth: "600px",
      minHeight: '300px',
      maxHeight: "85vh",
      disableClose: true,
    }).afterClosed().subscribe(action => {
      if (action) {
        console.log(action)
        this.getVatRateData()
      }
    });
  }
  edit(data: any) {
    this.dialog.open(AddEditVatRatesComponent, {
      autoFocus: false,
      data: data,
      minWidth: "600px",
      minHeight: '300px',
      maxHeight: "85vh",
      disableClose: true,
    }).afterClosed().subscribe(action => {
      if (action) {
        console.log(action)
        this.getVatRateData()
      }
    });
  }
}
