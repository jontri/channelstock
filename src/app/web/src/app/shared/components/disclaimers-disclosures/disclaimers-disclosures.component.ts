import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { OverlayService } from '@shared/services';

import * as $ from 'jquery';

@Component({
  selector: 'rom-disclaimers-disclosures',
  templateUrl: './disclaimers-disclosures.component.html',
  styleUrls: ['./disclaimers-disclosures.component.scss']
})
export class DisclaimersDisclosuresComponent implements OnInit, AfterViewInit {

  constructor(
    public overlayService: OverlayService,
    private elemRef: ElementRef
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $(this.elemRef.nativeElement).find('.modal-dialog').click((e) => {
      e.stopPropagation();
    });
  }

}
