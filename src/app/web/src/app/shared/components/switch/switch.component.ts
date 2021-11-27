import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'rom-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnChanges {
  @Input() value: boolean;

  formVal: FormControl;

  constructor() {
    this.formVal = new FormControl();
  }

  ngOnChanges() {
    this.formVal.setValue(this.value);
  }

}
