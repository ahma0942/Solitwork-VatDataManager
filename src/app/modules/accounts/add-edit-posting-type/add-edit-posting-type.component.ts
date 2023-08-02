import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { ConfigurationService } from 'src/app/services/configuration.service';

@Component({
  selector: 'app-add-edit-posting-type',
  templateUrl: './add-edit-posting-type.component.html',
  styleUrls: ['./add-edit-posting-type.component.scss']
})
export class AddEditPostingTypeComponent implements OnInit {
  recievedData:any
  postingForm: FormGroup = new FormGroup({})
  result:any
  fromDate: any;
  postingDetail: any;
  today:any=[new Date(),new Date()];
constructor(
  @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog:MatDialogRef<AddEditPostingTypeComponent>,
    private fb: FormBuilder,
    private configurationService:ConfigurationService
){
if(data){
  this.recievedData = data;
  console.log(this.recievedData)
  this.getPostingType(this.recievedData)

}
}
  ngOnInit(): void {
    this.createForm()

}
createForm(){
  this.postingForm = this.fb.group({
    postingType: new FormControl(this.postingDetail?.postingType,[Validators.required]),
    isVATExpectedOnPostingType: new FormControl((this.postingDetail?.isVATExpectedOnPostingType || false),[Validators.required]),
    validfrom: new FormControl((this.postingDetail?.validfrom || new Date().toISOString()),[Validators.required]),
    validto: new FormControl((this.postingDetail?.validto || new Date().toISOString()),[Validators.required]),
    date:[this.today]
  })

}
createPostingType(){
  this.postingForm.removeControl('date');
  this.configurationService.createPostingType(this.postingForm.value).subscribe(d=>{
    if(d){
      this.dialog.close('Created')
    }
  })
}
updatePostingType(){
  this.postingForm.removeControl('date');
  this.configurationService.updatePostingType(this.recievedData.postingType,this.postingForm.value).subscribe(d=>{
    if(d){
      this.dialog.close('Updated')
    }
  })
}
getPostingType(data:any){
  var obj ={
    postingtype_id:data.postingType,
  }
  this.configurationService.getSinglePostingType(obj).subscribe((d:any)=>{
    this.postingDetail = d
    console.log('Journal detail',this.postingDetail)
    this.today = [new Date(this.postingDetail.validfrom).toISOString(),new Date(this.postingDetail.validto).toISOString()]
    this.createForm()
  });
}
  close(){
    this.dialog.close();
  }

  // date range
  onChange(result: any): void {
    const fromDate = result[0]
    const toDate = result[0]
    fromDate.setHours(0)
    fromDate.setMinutes(0)
    fromDate.setSeconds(0)
    toDate.setHours(23)
    toDate.setMinutes(59)
    toDate.setSeconds(59)
    this.postingForm.controls['validfrom'].setValue(moment(fromDate).format('yyyy-MM-DDTHH:mm:ss'))
    this.postingForm.controls['validto'].setValue(moment(toDate).format('yyyy-MM-DDTHH:mm:ss'))
  }
}
