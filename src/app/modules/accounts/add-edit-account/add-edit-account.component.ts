import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { ConfigurationService } from 'src/app/services/configuration.service';

@Component({
  selector: 'app-add-edit-account',
  templateUrl: './add-edit-account.component.html',
  styleUrls: ['./add-edit-account.component.scss']
})
export class AddEditAccountComponent implements OnInit {
  recievedData: any
  accountForm: FormGroup;
  result: any
  accountDetail: any;
  today: any = [new Date(), new Date()];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialogRef<AddEditAccountComponent>,
    private fb: FormBuilder,
    private configurationService: ConfigurationService
  ) {
    this.createForm()
  }
  ngOnInit(): void {
    if (this.data) {
      this.recievedData = this.data;
      this.getAccount(this.recievedData)
    } else {
      this.createForm()
    }
  }
  createForm() {
    this.accountForm = this.fb.group({
      account: new FormControl(this.accountDetail?.account, [Validators.required]),
      accountVATCategory: new FormControl(this.accountDetail?.accountVATCategory, [Validators.required]),

      validfrom: new FormControl((this.accountDetail?.validfrom || new Date().toISOString()), [Validators.required]),
      validto: new FormControl((this.accountDetail?.validto || new Date().toISOString()), [Validators.required]),
      isVATExpectedOnAccount: new FormControl((this.accountDetail?.isVATExpectedOnAccount || false), [Validators.required]),
      date: [this.today],
    });

  }
  createAccount() {
    this.accountForm.removeControl('date');
    this.configurationService.createAccount(this.accountForm.value).subscribe(d => {
      if (d) {
        this.dialog.close('created')
      }
    })
  }
  updateAccount() {
    this.accountForm.removeControl('date');
    this.configurationService.updateAccount(this.recievedData.account, this.accountForm.value).subscribe(d => {
      if (d) {
        this.dialog.close('updated')
      }
    })
  }
  getAccount(data: any) {
    var obj = {
      account_id: data.account,
    }
    this.configurationService.getSingleAccount(obj).subscribe((d: any) => {
      if (d) {
        this.accountDetail = d
        this.today = [new Date(this.accountDetail?.validfrom).toISOString(), new Date(this.accountDetail?.validto).toISOString()]
        this.createForm()
      }
    });
  }
  close() {
    this.dialog.close();
  }

  // date range


  onChange(result: any): void {
    const fromDate = result[0]
    const toDate = result[1]
    fromDate.setHours(0)
    fromDate.setMinutes(0)
    fromDate.setSeconds(0)
    toDate.setHours(23)
    toDate.setMinutes(59)
    toDate.setSeconds(59)
    this.accountForm.controls['validfrom'].setValue(moment(fromDate).format('yyyy-MM-DDTHH:mm:ss'))
    this.accountForm.controls['validto'].setValue(moment(toDate).format('yyyy-MM-DDTHH:mm:ss'))
  }


}
