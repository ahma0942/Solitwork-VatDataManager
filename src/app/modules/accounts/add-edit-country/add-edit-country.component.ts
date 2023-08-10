import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { ConfigurationService } from 'src/app/services/configuration.service';

@Component({
  selector: 'app-add-edit-country',
  templateUrl: './add-edit-country.component.html',
  styleUrls: ['./add-edit-country.component.scss']
})
export class AddEditCountryComponent implements OnInit {
  recievedData: any
  countryForm: FormGroup = new FormGroup({})
  result: any
  countryDetail: any;
  today: any = [new Date(), new Date()];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialogRef<AddEditCountryComponent>,
    private fb: FormBuilder,
    private configurationService: ConfigurationService
  ) {
    if (data) {
      this.recievedData = data;
      console.log(this.recievedData)
      this.getcountry(this.recievedData)

    }
  }
  ngOnInit(): void {
    this.createForm()

  }
  createForm() {
    this.countryForm = this.fb.group({
      legalEntity: new FormControl(this.countryDetail?.legalEntity, [Validators.required]),
      legalEntityVATCountry: new FormControl(this.countryDetail?.legalEntityVATCountry, [Validators.required]),
      validfrom: new FormControl((this.countryDetail?.validfrom || new Date().toISOString()), [Validators.required]),
      validto: new FormControl((this.countryDetail?.validto || new Date().toISOString()), [Validators.required]),
      date: [this.today],
    })

  }
  createCountry() {
    this.configurationService.createCountry(this.countryForm.value).subscribe(d => {
      if (d) {
        this.dialog.close('Created')
      }
    })
  }
  updateCountry() {
    this.configurationService.updateCountry(this.recievedData.legalEntity, this.countryForm.value).subscribe(d => {
      if (d) {
        this.dialog.close('Updated')
      }
    })
  }
  getcountry(data: any) {
    var obj = {
      legalEntity: data.legalEntity,
    }
    this.configurationService.getSingleCountry(obj).subscribe((d: any) => {
      this.countryDetail = d
      console.log('country detail', this.countryDetail)
      this.today = [new Date(this.countryDetail.validfrom).toISOString(), new Date(this.countryDetail.validto).toISOString()]
      this.createForm()
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
    this.countryForm.controls['validfrom'].setValue(moment(fromDate).format('yyyy-MM-DDTHH:mm:ss'))
    this.countryForm.controls['validto'].setValue(moment(toDate).format('yyyy-MM-DDTHH:mm:ss'))
    this.countryForm.removeControl('date');
  }
}
