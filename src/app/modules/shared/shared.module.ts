import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberToKMBPipe } from './pipes/number-to-kmb.pipe';
import { FilterComponent } from './components/filter/filter.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';



@NgModule({
  declarations: [
    NumberToKMBPipe,
    FilterComponent,
    TranslatePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    NzSelectModule,
    NzDatePickerModule,
    NzTagModule,
    NzIconModule,
    MatDialogModule
  ],
  exports: [
    NumberToKMBPipe,
    FilterComponent,
    TranslatePipe
  ]
})
export class SharedModule { }
