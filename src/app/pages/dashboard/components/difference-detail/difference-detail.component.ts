import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-difference-detail',
  templateUrl: './difference-detail.component.html',
  styleUrls: ['./difference-detail.component.css']
})
export class DifferenceDetailComponent  implements OnInit{
  receivedData: any
  fromDate: any
  toDate: any
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialogRef<DifferenceDetailComponent>,) {
    if (sessionStorage.getItem('dateValue')) {
      var dateResult = JSON.parse(sessionStorage.getItem('dateValue'))
      this.fromDate = dateResult[0]
      this.toDate = dateResult[1]
    } else {
      this.fromDate = moment(new Date()).format('yyyy-MM-DDTHH:mm:ss')
      this.toDate = moment(new Date()).format('yyyy-MM-DDTHH:mm:ss')
    }
  }
  ngOnInit(): void {
    if (this.data) {
      this.receivedData = this.data
      console.log(this.receivedData)
    }
  }
}
