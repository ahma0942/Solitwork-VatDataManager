import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FinancialTransactionsComponent } from './financial-transactions/financial-transactions.component';
import { SharedModule } from '../shared/shared.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MatMenuModule } from '@angular/material/menu';

const routes: Routes= [
  {path:'', redirectTo:'logs',pathMatch:'full' },
  {path:'logs',component:FinancialTransactionsComponent},
]

@NgModule({
  declarations: [
    FinancialTransactionsComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    NzTableModule,
    NzIconModule,
    SharedModule,
    MatMenuModule
  ]
})
export class FinancialTransactionsModule { }
