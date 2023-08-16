import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { listOfColumn } from 'src/app/models/interfaces/listOfColumns.interface';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { AddEditPostingTypeComponent } from '../../../add-edit-posting-type/add-edit-posting-type.component';

@Component({
  selector: 'app-posting-type',
  templateUrl: './posting-type.component.html',
  styleUrls: ['./posting-type.component.scss']
})
export class PostingTypeComponent implements OnInit {
  listOfColumn: Array<listOfColumn> = [
    { title: "", variable: '', compare: (a: any, b: any) => null, priority: false, width: '' },
    { title: 'Posting Type', variable: 'postingType', compare: (a: any, b: any) => a.postingType < b.postingType ? 1 : -1, priority: true, width: '' },
    { title: 'VAT Expected on posting Type', variable: 'isVATExpectedOnPostingType', compare: (a: any, b: any) => a.isVATExpectedOnPostingType < b.isVATExpectedOnPostingType ? 1 : -1, priority: true, width: '150px' },
    { title: 'Valid From', variable: 'validfrom', compare: (a: any, b: any) => a.validfrom < b.validfrom ? 1 : -1, priority: true, width: '' },
    { title: 'Valid To', variable: 'validto', compare: (a: any, b: any) => a.validto < b.validto ? 1 : -1, priority: true, width: '' },
    { title: 'Edit', variable: 'edit', priority: true, width: '' },
    { title: 'Delete', variable: 'delete', priority: true, width: '' },
  ]
  listOfData: Array<any> = [];
  pagination: any = {
    limit: 25,
    skip: 0,
    page:0
  }



  constructor(private configurationService: ConfigurationService, private dialog: MatDialog,) {

  }

  ngOnInit(): void {
    this.getPostingTypes()
  }
  pageSizeChange(value: any) {
    this.pagination.skip = 0;
    this.pagination.limit = value;
  }
  pageIndexChange(event: any) {
    this.pagination.page = (event - 1)
    this.pagination.skip = this.pagination.page * this.pagination.limit
    this.getPostingTypes()
  }
  getPostingTypes() {
    var obj = {
      ...this.pagination
    }
    this.configurationService.getPostingType(obj).subscribe((d: any) => {
      this.listOfData = d.postingtypes
      this.pagination.count = d.count
    });
  }
  addPostingType() {
    this.dialog.open(AddEditPostingTypeComponent, {
      autoFocus: false,
      minWidth: "600px",
      minHeight: '300px',
      maxHeight: "85vh",
      disableClose: true,
    }).afterClosed().subscribe(action => {
      if (action) {
        console.log(action)
        this.getPostingTypes()
      }
    });
  }
  deletePostingType(data:any){
    var obj = {
      postingtype_id:data.postingType
    }
    this.configurationService.deletePostingType(obj).subscribe((d: any) => {
      this.getPostingTypes()
    });
  }
  editPostingType(data: any) {
    this.dialog.open(AddEditPostingTypeComponent, {
      autoFocus: false,
      data: data,
      minWidth: "600px",
      minHeight: '300px',
      maxHeight: "85vh",
      disableClose: true,
    }).afterClosed().subscribe(action => {
      if (action) {
        console.log(action)
        this.getPostingTypes()
      }
    });
  }
}
