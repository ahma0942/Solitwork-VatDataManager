import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { ConfigurationService } from 'src/app/services/configuration.service';

@Component({
  selector: 'app-add-edit-vat-rates',
  templateUrl: './add-edit-vat-rates.component.html',
  styleUrls: ['./add-edit-vat-rates.component.scss']
})
export class AddEditVatRatesComponent implements OnInit{
  recievedData:any
  postingForm: FormGroup = new FormGroup({})
  result:any
  fromDate: any;
  vatRateDetail: any;
constructor(
  @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog:MatDialogRef<AddEditVatRatesComponent>,
    private fb: FormBuilder,
    private configurationService:ConfigurationService
){
if(data){
  this.recievedData = data;
  console.log(this.recievedData)
  this.getVateRate(this.recievedData)

}
}
  ngOnInit(): void {
    this.createForm()

}
createForm(){
  this.postingForm = this.fb.group({

    vatRateID: new FormControl(this.vatRateDetail?.vatRateID,[Validators.required]),
    legalEntity: new FormControl(this.vatRateDetail?.legalEntity,[Validators.required]),
    account: new FormControl(this.vatRateDetail?.account,[Validators.required]),
    expectedVATType: new FormControl(this.vatRateDetail?.expectedVATType,[Validators.required]),
    expectedVATRate: new FormControl(this.vatRateDetail?.expectedVATRate,[Validators.required]),
    validfrom: new FormControl('',[Validators.required]),
    validto: new FormControl('',[Validators.required]),
  })

}
create(){
  this.configurationService.createPostingType(this.postingForm.value).subscribe(d=>{
    console.log(d)
  })
}
update(){
  console.log(this.recievedData.postingType,this.postingForm.value)
  this.configurationService.updatePostingType(this.recievedData.postingType,this.postingForm.value).subscribe(d=>{
    console.log(d)
  })
}
getVateRate(data:any){
  var obj ={
    vatrate_id:data.vatRateID,
  }
  this.configurationService.getSingleVatRate(obj).subscribe((d:any)=>{
    this.vatRateDetail = d
    console.log('Journal detail',this.vatRateDetail)
    this.createForm()
  });
}
  close(){
    this.dialog.close();
  }

  // date range
  today = new Date() ;

  onChange(result: any): void {
    this.postingForm.controls['validfrom'].setValue(moment(result[0]).format('yyyy-MM-DDTHH:mm:ss'))
    this.postingForm.controls['validto'].setValue(moment(result[1]).format('yyyy-MM-DDTHH:mm:ss'))
  }
}
