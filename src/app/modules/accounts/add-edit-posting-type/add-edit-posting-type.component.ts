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
    isVATExpectedOnPostingType: new FormControl(this.postingDetail?.isVATExpectedOnPostingType,[Validators.required]),
    validfrom: new FormControl('',[Validators.required]),
    validto: new FormControl('',[Validators.required]),
  })

}
createPostingType(){
  this.configurationService.createPostingType(this.postingForm.value).subscribe(d=>{
    console.log(d)
  })
}
updatePostingType(){
  console.log(this.recievedData.postingType,this.postingForm.value)
  this.configurationService.updatePostingType(this.recievedData.postingType,this.postingForm.value).subscribe(d=>{
    console.log(d)
  })
}
getPostingType(data:any){
  var obj ={
    postingtype_id:data.postingType,
  }
  this.configurationService.getSinglePostingType(obj).subscribe((d:any)=>{
    this.postingDetail = d
    console.log('Journal detail',this.postingDetail)
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
