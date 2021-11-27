import { Component, Input, OnChanges, SimpleChanges, Inject, ViewChild, ElementRef } from '@angular/core';
import { Company } from '@models';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'rom-qmod',
  templateUrl: './qmod.component.html',
  styleUrls: ['./qmod.component.scss']
})
export class QmodComponent implements OnChanges {
  @Input() type: string;
  @Input() company: Company;
  @Input() isOpen = false;
  @Input() noCompany = false;


  @ViewChild('qmodElem') qmodElem: ElementRef<HTMLElement>;

  qmodParams: string;
  isLoading = true;

  constructor(
    @Inject(DOCUMENT) private document: HTMLDocument
  ) { }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.company && changes.company.currentValue) {
      this.isLoading = true;
      // console.log("Onchange " + changes.company.currentValue.symbol + " -- " + this.type);
      this.buildParams(this.type, changes.company.currentValue.symbol);

    }

    if (changes.type && changes.type.currentValue && (this.company || this.noCompany)) {
      // console.log("Change on type : " + changes.type.currentValue);
      this.buildParams(changes.type.currentValue, this.company && this.company.symbol);

      if (this.isOpen) {
        this.loadQMod();
      }

    }

    if (changes.isOpen && changes.isOpen.currentValue) {
      this.isLoading = true;
      this.loadQMod();
      this.isLoading = false;
    }



  }

  private buildParams(qmodType: string, companySymbol: string) {

    switch (qmodType) {
      case 'interactivechart': {
        this.qmodParams = `{"chart":{"colors":["#deb400","#ff3900","#00b655","#ff9000","#717171","#8085e9"],"upColor":"#008000",` +
          `"downColor":"#ff0000","chartType":"1"},"volumeEnabled":true,"chartTypeEnabled":true,"marketSessionEnabled":true,` +
          `"adjTypeEnabled":false,"compareOptionsEnabled":true,"compareEnabled":true,"eventsEnabled":true,"dateRange":3,` +
          `"marketSession":1,"compareOption":0,"adjType":0,"lang":"en","yAxisLabelOffset":30,"xAxisTickSpace":135,` +
          `"xAxisShowFirstLabel":true,"xAxisShowLastLabel":true,"xAxisStaggerLines":0,"xAxisLabelRotation":0,"navigatorEnabled":false,` +
          `"symbol":"${companySymbol}"}`;
        break;
      }
      case 'insiders': {
        this.qmodParams = `{"pagerLimit":25,"showLogo":false,"lowHigh":false,"symbol":"${companySymbol}"}`;
        break;
      }
      case 'pricehistory': {
        this.qmodParams = `{"lang":"en","paging":true,"limitTo":"25","chart":{"colors":["#0b73be","#434348","#90ed7d","#f7a35c",` +
          `"#8085e9"],"backgroundColor":"#ffffff","legend":{"textColor":"#434348","backgroundColor":"#ffffff",` +
          `"textColorHover":"#000000","shadow":"#000000"},"yAxis":{"titleTextColor":"#cccccc","labelTextColor":"#434348"},` +
          `"xAxis":{"titleTextColor":"#cccccc","labelTextColor":"#434348"}},"showLogo":false,"lowHigh":false,` +
          `"symbol":"${companySymbol}"}`;
        break;
      }
      case 'keyratios': {
        this.qmodParams = `{"chart":{"colors":["#7cb5ec","#434348","#90ed7d","#f7a35c","#8085e9"],"backgroundColor":"#ffffff",` +
          `"legend":{"textColor":"#434348","backgroundColor":"#ffffff","textColorHover":"#000000","shadow":true},` +
          `"yAxis":{"titleTextColor":"#cccccc","labelTextColor":"#434348"},"xAxis":{"titleTextColor":"#cccccc",` +
          `"labelTextColor":"#434348"}},"showLogo":false,"lowHigh":false,"symbol":"${companySymbol}"}`;
        break;
      }
      case 'shareinfoperformance': {
        this.qmodParams = `{"lang":"en","chart":{"colors":["#7cb5ec","#434348","#90ed7d","#f18247","#df404a"],` +
          `"backgroundColor":"#ffffff","legend":{"textColor":"#434348","backgroundColor":"#ffffff","textColorHover":"#000000",` +
          `"shadow":true},"yAxis":{"titleTextColor":"#cccccc","labelTextColor":"#434348"},"xAxis":{"titleTextColor":"#cccccc",` +
          `"labelTextColor":"#434348"}},"showLogo":false,"lowHigh":false,"symbol":"${companySymbol}"}`;
        break;
      }
      case 'fullnewssummary': {
        this.qmodParams = `{"lang":"en","socialshare":true,"resultsPerPage":25,"summLen":100,"showLogo":false,"lowHigh":false,` +
          `"videonews":true,"showVideos":false,"showVideoControl":true,"showSharingButtons":true,"showThumbnail":false,` +
          `"dateHeadings":true,"symbol":"${companySymbol}"}`;
        break;
      }
      case 'financials':
      case 'detailedquotetab':
      case 'quotehead':
      case 'corporateevents':
        this.qmodParams = `{"symbol":"${companySymbol}"}`;
        break;
      case 'quotehead':
      case 'filings': {
        this.qmodParams = `{"symbol":"${companySymbol}"}`;
        break;
      }
      case 'marketsummary': {
        this.qmodParams = '{"charts":{"chfill":"eeeeee","chfill2":"0071bb","chln":"00578e","chtype":"Mountain"},' +
          '"mktNewsItems":6,"showSharingButtons":true}';
        break;
      }

    }
  }

  private loadQMod(): void {
    const qtoolElems = this.document.getElementsByClassName('qtool');
    for (let i = 0; i < qtoolElems.length; i++) {
      qtoolElems[i].classList.remove('qtool');
    }
    this.qmodElem.nativeElement.classList.add('qtool');
    this.qmodElem.nativeElement.classList.add(`rom-qmod-${this.type}`);
    let qmodScript = <HTMLScriptElement>this.document.getElementById('qmod');
    if (qmodScript) {
      qmodScript.parentNode.removeChild(qmodScript);
    }
    qmodScript = this.document.createElement('script');
    qmodScript.id = 'qmod';
    qmodScript.type = 'text/javascript';
    qmodScript.src = '//qmod.quotemedia.com/js/qmodLoader.js';
    qmodScript.setAttribute('data-qmod-wmid', '103029');
    qmodScript.setAttribute('data-qmod-env', 'app');
    qmodScript.setAttribute('data-qmod-version', '');
    qmodScript.async = true;

    this.document.getElementsByTagName('head')[0].appendChild(qmodScript);
  }
}
