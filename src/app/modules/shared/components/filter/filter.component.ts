import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatMenuPanel } from '@angular/material/menu';
import { FilterObject, ConstantFilterVariable } from './filter';
import { differenceInCalendarDays} from 'date-fns';
import * as moment from 'moment';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent  implements OnInit{

  @ViewChild('actionMenu') trigger: MatMenuPanel | null | any;
  @Output() onSubmitEvent = new EventEmitter<any>()
  @Input() filters: FilterObject[] = [];
  @Input() showFilters: boolean = false;
  chips: { label: string, value: string }[] = []
  operationalCityList:Array<any> = [];
  today = new Date();
  disabledDate = (current: Date): boolean => differenceInCalendarDays(current, this.today) > 0;
  constructor(
  ) { }

  ngOnInit(): void {

  }
  onChipCancel(label: string) {
    const idx = this.filters.findIndex(e => e.label === label);
    if (idx > -1) {
      this.filters[idx].check = false;
      if (this.filters[idx].variable == ConstantFilterVariable.date) {
        this.filters[idx].value = undefined;
      } else {
        this.filters[idx].value = undefined;
      }
    }
    this.onSubmit();
  }

  onSubmit() {
    this.chips = [];
    var obj: any = {}
    this.filters.forEach(field => {
      if (field.type == ConstantFilterVariable.date && field.value?.length) {
        this.chips.push({ label: field.label, value: `${moment(field.value[0]).format('L')} - ${moment(field.value[1]).format('L')}` });
        obj['from_date'] = moment(field.value[0]).format("yyyy-MM-DDTHH:mm:ss");
        obj['to_date'] = moment(field.value[1]).format("yyyy-MM-DDTHH:mm:ss");
      } else if (field.value && field.type !== ConstantFilterVariable.date) {
        obj[field.variable] = field.value.toString().trim();
        if (field.type == 'select') {
          const label = field.options?.find(e => e.value == field.value)?.label;
          this.chips.push({ label: field.label, value: label || field.value });
        } else {
          this.chips.push({ label: field.label, value: field.value });
        }
      }
    });
    this.onSubmitEvent.emit(obj);
    if (this.trigger) {
      this.trigger.close.emit(true);
    }
  }
  clear() {
    if (this.trigger) {
      this.trigger.close.emit(true);
    }
    this.chips = [];
    this.filters.forEach((field) => {
      field.check = false;
      field.value = undefined;
    });
    this.onSubmitEvent.emit({});
  }

  onDateChange(result: any, field: any): void {

    field.value = result;
    console.log(field)

  }

}
