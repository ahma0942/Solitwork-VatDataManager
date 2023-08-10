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
  recievedData: any
  journalForm: FormGroup = undefined;
  result: any
  journalDetail: any;
  today: any = [new Date(), new Date()];
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialog: MatDialogRef<AddEditJournalCategoryComponent>,
    private fb: FormBuilder,
    private configurationService: ConfigurationService
  ) {
  }
  ngOnInit(): void {
    if (this.data) {
      this.recievedData = this.data;
      this.getJournal(this.recievedData)
    } else {
      this.createForm()
    }

  }
  createForm() {
    this.journalForm = this.fb.group({
      journalCategory: [this.journalDetail?.journalCategory, [Validators.required]],
      transactionVATCategory: [this.journalDetail?.transactionVATCategory || null, [Validators.required]],
      validfrom: new FormControl((this.journalDetail?.validfrom || new Date().toISOString()), [Validators.required]),
      validto: new FormControl((this.journalDetail?.validto || new Date().toISOString()), [Validators.required]),
      date: [this.today]
    })

  }
  createJournal() {
    this.journalForm.removeControl('date');
    this.configurationService.createJournal(this.journalForm.value).subscribe(d => {
      if (d) {
        this.dialog.close('Created')
      }
    })
  }
  updateJournal() {
    this.journalForm.removeControl('date');
    this.configurationService.updateJournal(this.recievedData.journalCategory, this.journalForm.value).subscribe(d => {
      if (d) {
        this.dialog.close('Updated')
      }
    })
  }
  getJournal(data: any) {
    var obj = {
      journalcategory_id: data.journalCategory,
    }
    this.configurationService.getSingleJournal(obj).subscribe((d: any) => {
      this.journalDetail = d
      console.log('Journal detail', this.journalDetail)
      this.today = [new Date(this.journalDetail.validfrom).toISOString(), new Date(this.journalDetail.validto).toISOString()]
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
    this.journalForm.controls['validfrom'].setValue(moment(fromDate).format('yyyy-MM-DDTHH:mm:ss'))
    this.journalForm.controls['validto'].setValue(moment(toDate).format('yyyy-MM-DDTHH:mm:ss'))
  }
}
