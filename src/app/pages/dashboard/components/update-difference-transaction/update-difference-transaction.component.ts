import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-update-difference-transaction',
  templateUrl: './update-difference-transaction.component.html',
  styleUrls: ['./update-difference-transaction.component.scss']
})
export class UpdateDifferenceTransactionComponent implements OnInit {
  receivedData: any
  transactionData: any
  updateForm: FormGroup = undefined
  updateFile: FormGroup = undefined
  verificationId: any
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialog: MatDialogRef<UpdateDifferenceTransactionComponent>,
    private fb: FormBuilder,
    private dashboardService: DashboardService
  ) {

  }
  ngOnInit(): void {
    if (this.data) {
      this.receivedData = this.data;
      this.verificationId = this.data.verifications[0].verificationId
      this.getDifference(this.receivedData);
    } else {
      this.createForm()
    }
  }
  createForm() {
    this.updateForm = this.fb.group({
      note: new FormControl(this.transactionData?.note || '', [Validators.required]),
      reverifyDifference: new FormControl(this.transactionData?.void || false, [Validators.required]),
    })
    this.updateFile = this.fb.group({
      file: new FormControl(null, [Validators.required]),
    })

  }
  getDifference(data: any) {
    console.log('data', data)
    this.dashboardService.getSingleDifferenceData(this.verificationId).subscribe((d: any) => {
      if (d) {
        this.transactionData = d
        console.log('transaction data', this.transactionData)
        this.createForm()
      }
    });
  }
  updateData() {
    this.dashboardService.updateDifferenceData(this.verificationId, this.updateForm.value).subscribe((d: any) => {
      if (d) {
        this.dialog.close('Updated')
      }
    });
    this.dashboardService.updateFile(this.verificationId, this.updateFile.value.file).subscribe((d: any) => {
      if (d) {
        this.dialog.close('Updated')
      }
    });
  }
  fileChange(event) {
    var r = new FileReader();
    r.onload = (e) => {
      console.log(r.result)
      this.updateFile.controls['file'].setValue(r.result)
    }
    this.updateFile.controls['file'].setValue(event.target.files[0])

    //  r.readAsArrayBuffer(event.target.files[0])
  }
  close() {
    this.dialog.close();
  }
}
