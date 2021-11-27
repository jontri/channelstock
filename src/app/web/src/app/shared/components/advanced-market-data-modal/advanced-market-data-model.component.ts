import { Component, OnInit, Input } from '@angular/core';
import { Company } from '@models';

@Component({
  selector: 'rom-advanced-market-data-modal',
  templateUrl: './advanced-market-data-modal.component.html',
  styleUrls: ['./advanced-market-data-modal.component.scss']
})
export class AdvancedMarketDataModalComponent implements OnInit {
  @Input() marketDataTrigger: HTMLElement;
  @Input() company: Company;

  isExpanded = false;
  type: string;
  isQmodOpen = false;
  constructor() { }

  ngOnInit() {
  }

  closeQMod() {
    this.isExpanded = this.isQmodOpen = false;
  }

  showQMod(chosenType: string, openModal = true) {
    this.type = chosenType;

    if (openModal) {
      this.isExpanded = true;
      this.marketDataTrigger.click();
    }
  }

  openQmod(): void {
    setTimeout(() => this.isQmodOpen = true);
  }
}
