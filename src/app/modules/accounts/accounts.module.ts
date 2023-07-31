import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountLogsComponent } from './account-logs/account-logs.component';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { AccountsComponent } from './account-logs/components/accounts/accounts.component';
import { CountriesComponent } from './account-logs/components/countries/countries.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DeliveryJournalComponent } from './account-logs/components/delivery-journal/delivery-journal.component';
import { PostingTypeComponent } from './account-logs/components/posting-type/posting-type.component';
import { VatRatesComponent } from './account-logs/components/vat-rates/vat-rates.component';
import { AddEditAccountComponent } from './add-edit-account/add-edit-account.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { AddEditCountryComponent } from './add-edit-country/add-edit-country.component';
import { AddEditJournalCategoryComponent } from './add-edit-journal-category/add-edit-journal-category.component';
import { AddEditPostingTypeComponent } from './add-edit-posting-type/add-edit-posting-type.component';
import { AddEditVatRatesComponent } from './add-edit-vat-rates/add-edit-vat-rates.component';

const routes: Routes= [
  {path:'', redirectTo:'logs',pathMatch:'full' },
  {path:'logs',component:AccountLogsComponent},
  // {path:'add-account', component:AddEditAccountComponent },
]
@NgModule({
  declarations: [
    AccountLogsComponent,
    AccountsComponent,
    CountriesComponent,
    DeliveryJournalComponent,
    PostingTypeComponent,
    VatRatesComponent,
    AddEditAccountComponent,
    AddEditCountryComponent,
    AddEditJournalCategoryComponent,
    AddEditPostingTypeComponent,
    AddEditVatRatesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    NzPaginationModule,
    NzTableModule,
    NzIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    NzSelectModule,
    NzDatePickerModule,
    NzCheckboxModule
  ]
})
export class AccountsModule { }
