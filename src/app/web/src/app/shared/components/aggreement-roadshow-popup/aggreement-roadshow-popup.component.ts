import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { ContextMenuComponent } from '../context-menu/context-menu.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { OverlayService } from '@shared/services';

@Component({
  selector: 'rom-aggreement-roadshow-popup',
  templateUrl: './aggreement-roadshow-popup.component.html',
  styleUrls: ['./aggreement-roadshow-popup.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({opacity: 0}),
        animate(300, style({opacity: 1}))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(300, style({opacity: 0}))
      ])
    ])
  ]
})
export class AggreementRoadshowPopupComponent extends ContextMenuComponent<any> implements AfterViewInit {

  showDialog: boolean;

  constructor(
    private elemRef: ElementRef,
    public overlayService: OverlayService
  ) {
    super();
  }

  ngAfterViewInit() {
    $(this.elemRef.nativeElement).find('.agreement-div').on('click contextmenu', (e) => {
      e.stopPropagation();
    });
  }

}
