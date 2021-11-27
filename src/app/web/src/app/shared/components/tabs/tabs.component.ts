import { Component, Input, ContentChild, TemplateRef } from '@angular/core';

import { TabItem } from '@models';

@Component({
  selector: 'rom-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
  @Input() color: string;
  @Input() tabId: string;
  @Input() items: TabItem[];
  @ContentChild(TemplateRef) template: any;

  private prevItem: TabItem;

  toggle(item: TabItem) {
    if (!this.prevItem) {
      this.prevItem = this.items.find((x) => x.selected);
    }
    if (this.prevItem) {
      this.prevItem.selected = false;
    }
    if (item) {
      item.selected = true;
      this.prevItem = item;
    }
  }
}
