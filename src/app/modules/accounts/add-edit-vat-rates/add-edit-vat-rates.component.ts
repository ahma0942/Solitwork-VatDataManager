import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { ConfigurationService } from 'src/app/services/configuration.service';

@Component({
  selector: 'app-add-edit-vat-rates',
  templateUrl: './add-edit-vat-rates.component.html',
  styleUrls: ['./add-edit-vat-rates.component.scss'],
})
export class AddEditVatRatesComponent implements OnInit {
  recievedData: any;
  vatRateForm: FormGroup = undefined;
  result: any;
  fromDate: any;
  vatRateDetail: any;
  today:any=[new Date(),new Date()];
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialog: MatDialogRef<AddEditVatRatesComponent>,
    private fb: FormBuilder,
    private configurationService: ConfigurationService
  ) {

  }
  ngOnInit(): void {
    if (this.data) {
      this.recievedData = this.data;
      console.log(this.recievedData);
      this.getVateRate(this.recievedData);
    }else{
      this.createForm()
    }
  }
  createForm() {
    this.vatRateForm = this.fb.group({
      vatRateID: new FormControl(this.vatRateDetail?.vatRateID, [
        Validators.required,
      ]),
      legalEntity: new FormControl(this.vatRateDetail?.legalEntity, [
        Validators.required,
      ]),
      account: new FormControl(this.vatRateDetail?.account, [
        Validators.required,
      ]),
      expectedVATType: new FormControl(this.vatRateDetail?.expectedVATType, [
        Validators.required,
      ]),
      expectedVATRate: new FormControl(this.vatRateDetail?.expectedVATRate, [
        Validators.required,
      ]),
      validfrom: new FormControl((this.vatRateDetail?.validfrom || new Date()), [Validators.required]),
      validto: new FormControl((this.vatRateDetail?.validto || new Date()), [Validators.required]),
      date:[this.today]
    });
  }
  create() {
    this.vatRateForm.removeControl('date');
    this.configurationService
      .createVateRate(this.vatRateForm.value)
      .subscribe((d) => {
        if(d){
          this.dialog.close('Created')
        }
      });
  }
  update(): void {
    this.vatRateForm.removeControl('date');
    console.log(this.recievedData.postingType, this.vatRateForm.value);
    this.configurationService
      .updateVarRate(this.recievedData.vatRateID, this.vatRateForm.value)
      .subscribe((d) => {
        if(d){
          this.dialog.close('Updated')
        }

      });
  }
  getVateRate(data: any) {
    var obj = {
      vatrate_id: data.vatRateID,
    };
    this.configurationService.getSingleVatRate(obj).subscribe((d: any) => {
      console.log('vaterate',d)
      this.vatRateDetail = d;
      this.today = [new Date(this.vatRateDetail.validfrom).toISOString(),new Date(this.vatRateDetail.validto).toISOString()]
      this.createForm();
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
    this.vatRateForm.controls['validfrom'].setValue(moment(fromDate).format('yyyy-MM-DDTHH:mm:ss'))
    this.vatRateForm.controls['validto'].setValue(moment(toDate).format('yyyy-MM-DDTHH:mm:ss'))
  }
}
