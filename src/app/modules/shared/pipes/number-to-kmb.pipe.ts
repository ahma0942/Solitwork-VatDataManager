import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToKMB'
})
export class NumberToKMBPipe implements PipeTransform {

  transform(value: number){
    if(isNaN(value)){
      return 0;
    }


    const isNegative = value < 0;
    value = Math.abs(value);

    if (value < 1000) {
      return (isNegative ? '-' : '') + value.toFixed(2);
    } else if (value >= 1000 && value < 1000000) {
      const kValue = (value / 1000).toFixed(2);
      return `${isNegative ? '-' : ''}${kValue}K`;
    } else if (value >= 1000000 && value < 1000000000) {
      const mValue = (value / 1000000).toFixed(2);
      return `${isNegative ? '-' : ''}${mValue}M`;
    } else if (value >= 1000000000 && value < 1000000000000) {
      const bValue = (value / 1000000000).toFixed(2);
      return `${isNegative ? '-' : ''}${bValue}B`;
    } else {
      const tValue = (value / 1000000000000).toFixed(2);
      return `${isNegative ? '-' : ''}${tValue}T`;
    }
  }

}
