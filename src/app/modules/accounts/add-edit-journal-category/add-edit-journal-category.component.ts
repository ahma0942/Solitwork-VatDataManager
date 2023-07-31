import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { ConfigurationService } from 'src/app/services/configuration.service';

@Component({
  selector: 'app-add-edit-journal-category',
  templateUrl: './add-edit-journal-category.component.html',
  styleUrls: ['./add-edit-journal-category.component.scss']
})
export class AddEditJournalCategoryComponent {
  recievedData:any
  journalForm: FormGroup = new FormGroup({})
  result:any
  fromDate: any;
  journalDetail: any;
constructor(
  @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog:MatDialogRef<AddEditJournalCategoryComponent>,
    private fb: FormBuilder,
    private configurationService:ConfigurationService
){
if(data){
  this.recievedData = data;
  console.log(this.recievedData)
  this.getJournal(this.recievedData)

}
}
  ngOnInit(): void {
    this.createForm()

}
createForm(){
  this.journalForm = this.fb.group({
    journalCategory: new FormControl(this.journalDetail?.journalCategory,[Validators.required]),
    transactionVATCategory: new FormControl(this.journalDetail?.transactionVATCategory,[Validators.required]),
    validfrom: new FormControl('',[Validators.required]),
    validto: new FormControl('',[Validators.required]),
  })

}
createJournal(){
  this.configurationService.createCountry(this.journalForm.value).subscribe(d=>{
    console.log(d)
  })
}
updateJournal(){
  this.configurationService.updateCountry(this.recievedData.legalEntity,this.journalForm.value).subscribe(d=>{
    console.log(d)
  })
}
getJournal(data:any){
  var obj ={
    journalcategory_id:data.journalCategory,
  }
  this.configurationService.getSingleJournal(obj).subscribe((d:any)=>{
    this.journalDetail = d
    console.log('Journal detail',this.journalDetail)
    this.createForm()
  });
}
  close(){
    this.dialog.close();
  }

  // date range
  today = new Date() ;

  onChange(result: any): void {
    this.journalForm.controls['validfrom'].setValue(moment(result[0]).format('yyyy-MM-DDTHH:mm:ss'))
    this.journalForm.controls['validto'].setValue(moment(result[1]).format('yyyy-MM-DDTHH:mm:ss'))
  }
}
