import * as $ from 'jquery';

import { Directive, HostListener } from '@angular/core';
import { OverlayConfig } from '@angular/cdk/overlay';
import { OverlayService } from '@shared/services';
import { DisclaimersDisclosuresComponent } from '../../components/disclaimers-disclosures/disclaimers-disclosures.component';

@Directive({
  selector: '[romDisclaimersDisclosures]'
})
export class DisclaimersDisclosuresDirective {
  constructor(
    private overlayService: OverlayService
  ) { }

  @HostListener('click') onclick() {
    const overlayConfig: OverlayConfig = {
      hasBackdrop: true,
      backdropClass: ['rom-backdrop', 'rom-dark-overlay'],
      positionStrategy: this.overlayService.positionBuilder.global().centerHorizontally().centerVertically()
    };

    const overlayRef = this.overlayService.create(overlayConfig);
    this.overlayService.attachComponent(overlayRef, DisclaimersDisclosuresComponent);

    $(overlayRef.overlayElement).click((evt) => {
      overlayRef.detach();
      overlayRef.dispose();
    });
  }

}
