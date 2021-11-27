import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'rom-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {
  @Input() isAsc: boolean;
  @Input() isActive: boolean;
  @Output() action: EventEmitter<void>;

  constructor() {
    this.action = new EventEmitter<void>();
  }

  ngOnInit() {
  }

  onClick() {
    this.action.emit();
  }
}
