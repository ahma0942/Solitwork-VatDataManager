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
export class AddEditAccountComponent implements OnInit{
  recievedData:any
  accountForm: FormGroup = new FormGroup({})
  result:any
  fromDate: any;
  accountDetail: any;
constructor(
  @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog:MatDialogRef<AddEditAccountComponent>,
    private fb: FormBuilder,
    private configurationService:ConfigurationService
){
if(data){
  this.recievedData = data;
  this.getAccount(this.recievedData)

}
}
  ngOnInit(): void {
    this.createForm()

}
createForm(){
  this.accountForm = this.fb.group({
    account: new FormControl(this.accountDetail?.account,[Validators.required]),
    accountVATCategory: new FormControl(this.accountDetail?.accountVATCategory,[Validators.required]),
    validfrom: new FormControl('',[Validators.required]),
    validto: new FormControl('',[Validators.required]),
    isVATExpectedOnAccount: new FormControl(this.accountDetail?.isVATExpectedOnAccount,[Validators.required]),
  })

}
createAccount(){
  this.configurationService.createAccount(this.accountForm.value).subscribe(d=>{
    console.log(d)
  })
}
updateAccount(){
  this.configurationService.updateAccount(this.recievedData.account,this.accountForm.value).subscribe(d=>{
    console.log(d)
  })
}
getAccount(data:any){
  var obj ={
    account_id:data.account,
  }
  this.configurationService.getSingleAccount(obj).subscribe((d:any)=>{
    this.accountDetail = d
    console.log('account detail',this.accountDetail)
    this.createForm()
  });
}
  close(){
    this.dialog.close();
  }

  // date range
  today = new Date() ;

  onChange(result: any): void {
    this.accountForm.controls['validfrom'].setValue(moment(result[0]).format('yyyy-MM-DDTHH:mm:ss'))
    this.accountForm.controls['validto'].setValue(moment(result[1]).format('yyyy-MM-DDTHH:mm:ss'))
  }


}
