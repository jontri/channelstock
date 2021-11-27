import { Component, Output, EventEmitter, Input, AfterViewInit, OnInit } from '@angular/core';

@Component({
  selector: 'rom-expand',
  templateUrl: './expand.component.html',
  styleUrls: ['./expand.component.scss']
})
export class ExpandComponent implements OnInit, AfterViewInit {
  @Input() isExpanded: boolean;
  @Input() openedIcon: string;
  @Input() closedIcon: string;
  @Output() isExpandedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() action: EventEmitter<void> = new EventEmitter<void>();
  @Output() viewInit: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit() {
    if (!this.openedIcon) {
      this.openedIcon = 'fa-compress';
    }
    if (!this.closedIcon) {
      this.closedIcon = 'fa-expand';
    }
  }

  ngAfterViewInit() {
    this.viewInit.emit();
  }

  toggle(): void {
    this.isExpandedChange.emit(this.isExpanded = !this.isExpanded);
    this.action.emit();
  }
}
