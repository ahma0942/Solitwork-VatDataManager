import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatBadgeModule } from '@angular/material/badge';
import { SharedModule } from '../modules/shared/shared.module';

const routes: Routes = [
  {
    path: "", component: LayoutComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', loadChildren: () => import('../pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'accounts', loadChildren: () => import('../modules/accounts/accounts.module').then(m => m.AccountsModule) },
      { path: 'financial-transactions', loadChildren: () => import('../modules/financial-transactions/financial-transactions.module').then(m => m.FinancialTransactionsModule) },
    ]
  },
];

@NgModule({
  declarations: [
    SideNavComponent,
    LayoutComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatIconModule,
    RouterModule.forChild(routes),
    MatMenuModule,
    MatDividerModule,
    MatInputModule,
    MatBadgeModule,
    SharedModule
  ]
})
export class LayoutModule { }
