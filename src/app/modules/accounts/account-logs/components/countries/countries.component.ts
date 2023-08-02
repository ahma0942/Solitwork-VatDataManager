import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { listOfColumn } from 'src/app/models/interfaces/listOfColumns.interface';
import { Pagination } from 'src/app/models/interfaces/pagination.interface';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { AddEditCountryComponent } from '../../../add-edit-country/add-edit-country.component';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent  implements OnInit{
  listOfColumn: Array<listOfColumn> = [
    {title:"",  variable:'',  compare: (a:any, b:any)=> null , priority:false , width:''},
    {title:'Legal Entity', variable:'legalEntity',compare:(a:any,b:any)=>a.legalEntity < b.legalEntity ? 1 : -1, priority:true,width:''},
    {title:'VAT Country', variable:'legalEntityVATCountry',compare:(a:any,b:any)=>a.legalEntityVATCountry < b.legalEntityVATCountry ? 1 : -1, priority:true,width:''},
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
    private dialog:MatDialog,){

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
    this.configurationService.getCountriesConfiguration(obj).subscribe((d:any)=>{
      this.listOfData = d.countries
    });
  }

  addCountry(){
    this.dialog.open(AddEditCountryComponent,{
      autoFocus:false,
      minWidth:"600px",
      minHeight:'300px',
      maxHeight:"85vh",
      disableClose:true,
    }).afterClosed().subscribe(action=>{
      if(action){
        console.log(action)
        this.getCountriesData()
      }
  });
  }
  editCountry(data:any){
    this.dialog.open(AddEditCountryComponent,{
      autoFocus:false,
      data:data,
      minWidth:"600px",
      minHeight:'300px',
      maxHeight:"85vh",
      disableClose:true,
    }).afterClosed().subscribe(action=>{
      if(action){
        console.log(action)
        this.getCountriesData()
      }
  });
  }
}
