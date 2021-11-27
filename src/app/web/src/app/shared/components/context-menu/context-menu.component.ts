import { Component, Input } from '@angular/core';

@Component({
  selector: 'rom-context-menu',
  template: ''
})
export class ContextMenuComponent<T> {
  @Input() data: T;

  constructor() { }

}
