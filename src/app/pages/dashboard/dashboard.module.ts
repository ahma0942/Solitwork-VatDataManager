import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { KpisComponent } from './components/kpis/kpis.component';
import { DiffrenceComponent } from './components/diffrence/diffrence.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DetailOverviewComponent } from './components/detail-overview/detail-overview.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VatTransactionDetailComponent } from './components/vat-transaction-detail/vat-transaction-detail.component';
import { UpdateDifferenceTransactionComponent } from './components/update-difference-transaction/update-difference-transaction.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MatMenuModule } from '@angular/material/menu';
import { DifferenceDetailComponent } from './components/difference-detail/difference-detail.component';
import { NzTagModule } from 'ng-zorro-antd/tag';



const routes: Routes = [

  { path: '', component: DashboardComponent }
]
@NgModule({
  declarations: [
    DashboardComponent,
    KpisComponent,
    DiffrenceComponent,
    DetailOverviewComponent,
    VatTransactionDetailComponent,
    UpdateDifferenceTransactionComponent,
    DifferenceDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
    NzTableModule,
    SharedModule,
    NzDatePickerModule,
    NzCheckboxModule,
    NzIconModule,
    MatMenuModule,
    NzTagModule

  ]
})
export class DashboardModule { }
