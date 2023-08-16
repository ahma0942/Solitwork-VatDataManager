import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-add-verification',
  templateUrl: './add-verification.component.html',
  styleUrls: ['./add-verification.component.css']
})
export class AddVerificationComponent implements OnInit{

  addForm: FormGroup = undefined
  receivedData:any
  today: any = [new Date(), new Date()];
  userData:any
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialog: MatDialogRef<AddVerificationComponent>,
    private fb: FormBuilder,
    private dashboardService: DashboardService
  ) {
    this.receivedData = this.data;
  }
  ngOnInit(): void {
    this.createForm()
    this.getUser()
    console.log(this.receivedData)
  }
  createForm() {
    this.addForm = this.fb.group({
      note: new FormControl( '', [Validators.required]),
      from_date: new FormControl(( new Date().toISOString()), [Validators.required]),
      to_date: new FormControl(( new Date().toISOString()), [Validators.required]),
      date: [this.today],
      // reverifyDifference: new FormControl(|| false, [Validators.required]),
    })

  }
  getUser(){
    this.dashboardService.getUser().subscribe(d => {
      if (d) {
        this.userData = d
        console.log(d)
      }
    })
  }
  create(){
    this.addForm.removeControl('date');
    var obj={
      differenceId:this.receivedData?.differenceId,
      legalEntity:this.receivedData?.legalEntity,
      journalNumber:this.receivedData?.journalNumber,
      ...this.addForm.value,
    }
    this.dashboardService.addVerification(obj,this.userData).subscribe(d => {
      if (d) {
        this.dialog.close('created')
      }
    })
  }
  close() {
    this.dialog.close();
  }
  onChange(result: any): void {
    const fromDate = result[0]
    const toDate = result[1]
    fromDate.setHours(0)
    fromDate.setMinutes(0)
    fromDate.setSeconds(0)
    toDate.setHours(23)
    toDate.setMinutes(59)
    toDate.setSeconds(59)
    this.addForm.controls['from_date'].setValue(moment(fromDate).format('yyyy-MM-DDTHH:mm:ss'))
    this.addForm.controls['to_date'].setValue(moment(toDate).format('yyyy-MM-DDTHH:mm:ss'))
  }
}
