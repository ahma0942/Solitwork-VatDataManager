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
export class AddEditCountryComponent implements OnInit{
  recievedData:any
  countryForm: FormGroup = new FormGroup({})
  result:any
  fromDate: any;
  countryDetail: any;
constructor(
  @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog:MatDialogRef<AddEditCountryComponent>,
    private fb: FormBuilder,
    private configurationService:ConfigurationService
){
if(data){
  this.recievedData = data;
  console.log(this.recievedData)
  this.getcountry(this.recievedData)

}
}
  ngOnInit(): void {
    this.createForm()

}
createForm(){
  this.countryForm = this.fb.group({
    legalEntity: new FormControl(this.countryDetail?.legalEntity,[Validators.required]),
    legalEntityVATCountry: new FormControl(this.countryDetail?.legalEntityVATCountry,[Validators.required]),
    validfrom: new FormControl('',[Validators.required]),
    validto: new FormControl('',[Validators.required]),
  })

}
createCountry(){
  this.configurationService.createCountry(this.countryForm.value).subscribe(d=>{
    console.log(d)
  })
}
updateCountry(){
  this.configurationService.updateCountry(this.recievedData.legalEntity,this.countryForm.value).subscribe(d=>{
    console.log(d)
  })
}
getcountry(data:any){
  var obj ={
    legalEntity:data.legalEntity,
  }
  this.configurationService.getSingleCountry(obj).subscribe((d:any)=>{
    this.countryDetail = d
    console.log('country detail',this.countryDetail)
    this.createForm()
  });
}
  close(){
    this.dialog.close();
  }

  // date range
  today = new Date() ;

  onChange(result: any): void {
    this.countryForm.controls['validfrom'].setValue(moment(result[0]).format('yyyy-MM-DDTHH:mm:ss'))
    this.countryForm.controls['validto'].setValue(moment(result[1]).format('yyyy-MM-DDTHH:mm:ss'))
  }
}
