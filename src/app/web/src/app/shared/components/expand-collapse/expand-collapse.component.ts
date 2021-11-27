import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UtilsService } from '@shared/services';

@Component({
  selector: 'rom-expand-collapse',
  templateUrl: './expand-collapse.component.html',
  styleUrls: ['./expand-collapse.component.scss']
})
export class ExpandCollapseComponent implements OnChanges {
  // collapsed height passed in as px then converted to vw
  @Input() collapseHeight: number;
  // expanded height passed in as px
  @Input() expandHeight: number;

  public collapseHeightVw: number;
  public isCollapsed: boolean;

  constructor(
    private utilsService: UtilsService
  ) {
    this.collapseHeight = 0;
    this.expandHeight = 0;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.collapseHeight && changes.collapseHeight.currentValue) {
      // convert to vw
      this.collapseHeightVw = this.utilsService.pxToVw(changes.collapseHeight.currentValue);

      if (changes.expandHeight.currentValue) {
        this.isCollapsed = changes.expandHeight.currentValue > changes.collapseHeight.currentValue;
      }
    }
  }

  toggle(): void {
    this.isCollapsed = !this.isCollapsed;
  }

}
