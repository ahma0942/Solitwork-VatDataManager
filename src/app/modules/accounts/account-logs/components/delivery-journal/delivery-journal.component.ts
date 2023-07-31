import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { listOfColumn } from 'src/app/models/interfaces/listOfColumns.interface';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { AddEditJournalCategoryComponent } from '../../../add-edit-journal-category/add-edit-journal-category.component';

@Component({
  selector: 'app-delivery-journal',
  templateUrl: './delivery-journal.component.html',
  styleUrls: ['./delivery-journal.component.scss']
})
export class DeliveryJournalComponent implements OnInit{
  listOfColumn: Array<listOfColumn> = [
    {title:"",  variable:'',  compare: (a:any, b:any)=> null , priority:false , width:''},
    {title:'Journal Category', variable:'journalCategory',compare:(a:any,b:any)=>a.journalCategory < b.journalCategory ? 1 : -1, priority:true,width:''},
    {title:'Transaction VAT Category', variable:'transactionVATCategory',compare:(a:any,b:any)=>a.transactionVATCategory < b.transactionVATCategory ? 1 : -1, priority:true,width:''},
    {title:'Valid From', variable:'validfrom',compare:(a:any,b:any)=>a.validfrom < b.validfrom ? 1 : -1, priority:true,width:''},
    {title:'Valid To', variable:'validto',compare:(a:any,b:any)=>a.validto < b.validto ? 1 : -1, priority:true,width:''},
    {title:'Action', variable:'action', priority:true,width:''},
      ]
    listOfData:Array<any> = [];
  pagination: any = {
    limit: 25,
    skip: 0,
  }



  constructor(private configurationService:ConfigurationService,
    private dialog:MatDialog,
    ){

  }

  ngOnInit(): void {
this.getCountriesData()
  }
  pageSizeChange(value: any) {
    this.pagination.skip = 0;
    this.pagination.limit = value;
  }
  pageIndexChange(event:any){
    this.pagination.skip = event -1;
  }
  getCountriesData(){
    var obj ={
      ...this.pagination
    }
    this.configurationService.getDeliveryJournal(obj).subscribe((d:any)=>{
      this.listOfData = d.journalcategories
    });
  }
  addJournal(){
    this.dialog.open(AddEditJournalCategoryComponent,{
      autoFocus:false,
      minWidth:"600px",
      minHeight:'300px',
      maxHeight:"85vh",
      disableClose:true,
    }).afterClosed().subscribe(action=>{
      if(action){
        console.log(action)
      }
  });
  }
  editJournal(data:any){
    this.dialog.open(AddEditJournalCategoryComponent,{
      autoFocus:false,
      data:data,
      minWidth:"600px",
      minHeight:'300px',
      maxHeight:"85vh",
      disableClose:true,
    }).afterClosed().subscribe(action=>{
      if(action){
        console.log(action)
      }
  });
  }
}
