import { Component, OnInit } from '@angular/core';
import { accountData } from 'src/app/models/interfaces/accountData.interface';
import { listOfColumn } from 'src/app/models/interfaces/listOfColumns.interface';
import { Pagination } from 'src/app/models/interfaces/pagination.interface';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { AccountData } from 'src/assets/accountconfig';
import { MatDialog } from '@angular/material/dialog';
import { AddEditAccountComponent } from '../../../add-edit-account/add-edit-account.component';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit{
  listOfColumn: Array<listOfColumn> = [
    {title:"",  variable:'',  compare: (a:any, b:any)=> null , priority:false , width:''},
    {title:'accounts_id', variable:'Account',compare:(a:any,b:any)=>a.Account < b.Account ? 1 : -1, priority:true,width:''},
    {title:'account_name', variable:'accountName',compare:(a:any,b:any)=>a.accountName < b.accountName ? 1 : -1, priority:true,width:''},
    {title:'accounts_VATCategory', variable:'AccountVATCategory',compare:(a:any,b:any)=>a.AccountVATCategory < b.AccountVATCategory ? 1 : -1, priority:true,width:''},
    {title:'accounts_vataccount', variable:'IsVATExpectedOnAccount',compare:(a:any,b:any)=>a.IsVATExpectedOnAccount < b.IsVATExpectedOnAccount ? 1 : -1, priority:true,width:''},
    {title:'Action', variable:'action', priority:true,width:''},
      ]
    listOfData:Array<any> = [];
  pagination: any = {
    limit: 25,
    skip: 0,
  }



  constructor(
    private configurationService:ConfigurationService,
    private dialog:MatDialog,
    ){

  }

  ngOnInit(): void {
this.getAccountsData()
  }
  pageSizeChange(value: any) {
    this.pagination.skip = 0;
    this.pagination.limit = value;
  }
  pageIndexChange(event:any){
    this.pagination.skip = event -1;
    this.getAccountsData()
  }
  getAccountsData(){
    var obj ={
      ...this.pagination
    }
    this.configurationService.getAccountConfigurations(obj).subscribe((d:any)=>{
      this.listOfData = d.accounts
      this.pagination.count = d.count
    });
  }
  addAccount(){
    this.dialog.open(AddEditAccountComponent,{
      autoFocus:false,
      minWidth:"600px",
      minHeight:'300px',
      maxHeight:"85vh",
      disableClose:true,
    }).afterClosed().subscribe(action=>{
      if(action){
        console.log(action)
        this.getAccountsData()
      }
  });
  }
  editAccount(data:any){
    this.dialog.open(AddEditAccountComponent,{
      autoFocus:false,
      data:data,
      minWidth:"600px",
      minHeight:'300px',
      maxHeight:"85vh",
      disableClose:true,
    }).afterClosed().subscribe(action=>{
      if(action){
        console.log(action)
        this.getAccountsData()
      }
  });
  }

}
