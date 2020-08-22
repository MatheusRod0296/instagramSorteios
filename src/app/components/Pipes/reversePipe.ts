import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'reverse' })

export class ReversePipe implements PipeTransform {
    
  transform(value) {
    debugger;
    return value.slice().reverse();
  }
}