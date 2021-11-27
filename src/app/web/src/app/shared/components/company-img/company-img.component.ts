import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Company } from '@models';

@Component({
  selector: 'rom-company-img',
  templateUrl: './company-img.component.html',
  styleUrls: ['./company-img.component.scss']
})
export class CompanyImgComponent implements AfterViewInit {
  @ViewChild('companyLogo') logoElem: ElementRef;
  @Input() company: Company;
  // @Input() isReady: boolean;
  @Output() isReadyChange: EventEmitter<boolean>;


  constructor() {
    this.isReadyChange = new EventEmitter<boolean>();
  }

  ngAfterViewInit() {
    if(this.logoElem && this.logoElem.nativeElement){
      this.logoElem.nativeElement.onload = () => this.isReadyChange.emit(true);
      this.logoElem.nativeElement.onerror = () => this.isReadyChange.emit(true);
    }
  }
}
