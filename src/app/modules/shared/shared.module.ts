import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberToKMBPipe } from './pipes/number-to-kmb.pipe';



@NgModule({
  declarations: [
    NumberToKMBPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    NumberToKMBPipe
  ]
})
export class SharedModule { }
