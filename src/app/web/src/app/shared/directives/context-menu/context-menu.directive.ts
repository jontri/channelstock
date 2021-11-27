import * as $ from 'jquery';

import { Directive, HostListener, Renderer2, Inject, ComponentRef, Input, ElementRef } from '@angular/core';
import { ScrollStrategyOptions } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/platform-browser';
import { OverlayService } from '@shared/services';
import { ContextMenuComponent } from '../../components/context-menu/context-menu.component';

@Directive({
  selector: '[romContextMenu]'
})
export class ContextMenuDirective {
  private static OVERLAY_CSS = {
    'z-index': '9999',
    'width': '100%',
    'position': 'absolute',
    'top': '0',
    'left': '0'
  };
  private static MENU_CSS = {
    'z-index': '10000',
    'position': 'absolute',
    'display': 'block'
  };

  @Input() data: any;
  @Input() component: any;
  @Input() events: string[];
  @Input() romDisabled = false;

  constructor(
    private scrollStrategyOptions: ScrollStrategyOptions,
    @Inject(DOCUMENT) private document: HTMLDocument,
    private overlayService: OverlayService,
    private el: ElementRef
  ) { }

  @HostListener('mouseenter') onMouseEnter() {
    // TODO: add styles here?
  }

  @HostListener('mouseleave') onMouseLeave() {
    // TODO: remove styles here?
  }

  @HostListener('contextmenu', ['$event']) onContextMenu(e: MouseEvent) {
    if (this.events.find(event => event === 'contextmenu') && !this.romDisabled) {
      this.showOverlay(e);
      // prevent default behavior
      return false;
    }
  }

  @HostListener('click', ['$event']) onClick(e: MouseEvent) {
    if (this.events.find(event => event === 'click') && !this.romDisabled) {
      this.showOverlay(e);
      // prevent default behavior
      return false;
    }
  }

  private showOverlay(e: MouseEvent) {
    this.overlayService.removeAll();

    const overlayRef = this.overlayService.create({
      scrollStrategy: this.scrollStrategyOptions.close()
    });

    const overlayElem = $(overlayRef.overlayElement);
    overlayElem.css(ContextMenuDirective.OVERLAY_CSS)
      .css('height', $(this.document.body).height());

    overlayElem.on('click contextmenu', () => {
      overlayRef.detach();
      overlayRef.dispose();
    });

    const componentRef: ComponentRef<ContextMenuComponent<any>> = this.overlayService.attachComponent(overlayRef, this.component);
    const componentInstance = componentRef.instance;
    const componentElem = $(componentRef.location.nativeElement);

    componentInstance.data = this.data;

    componentElem.css(ContextMenuDirective.MENU_CSS)
      .css('top', e.y)
      .css('left', e.x);
  }

}
