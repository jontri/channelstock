import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Company } from '@models';
import { LoginService } from '@api';

@Component({
  selector: 'rom-ticker-info-table',
  templateUrl: './ticker-info-table.component.html',
  styleUrls: ['./ticker-info-table.component.scss']
})
export class TickerInfoTableComponent implements OnInit {
  @Input() company: Company;
  @ViewChild('marketDataTrigger') marketDataTrigger: ElementRef;
  constructor(
    public loginService: LoginService
  ) { }

  ngOnInit() {
  }

  showAdvancedMarketData() {
    this.marketDataTrigger.nativeElement.click();
  }

}
