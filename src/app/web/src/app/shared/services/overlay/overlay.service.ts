import { Injectable, ComponentRef } from '@angular/core';
import { OverlayConfig, Overlay, OverlayRef, OverlayPositionBuilder, OverlayContainer } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  private overlayRefs: OverlayRef[];

  constructor(
    private overlay: Overlay,
    private overlayContainer: OverlayContainer
  ) {
    this.overlayRefs = [];
  }

  attachComponent(overlayRef: OverlayRef, component: ComponentType<any>): ComponentRef<any> {
    return overlayRef.attach(new ComponentPortal(component));
  }

  create(config: OverlayConfig) {
    const pos = this.overlayRefs.push(this.overlay.create(config));
    return this.overlayRefs[pos - 1];
  }

  removeAll() {
    this.overlayRefs = this.overlayRefs.filter((overlayRef) => {
      overlayRef.detach();
      overlayRef.dispose();
      return false;
    });
  }

  get positionBuilder(): OverlayPositionBuilder {
    return this.overlay.position();
  }

  get containerElement(): HTMLElement {
    return this.overlayContainer.getContainerElement();
  }
}
