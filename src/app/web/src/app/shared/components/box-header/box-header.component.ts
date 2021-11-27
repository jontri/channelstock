import { Component, Input, AfterViewInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'rom-box-header',
  templateUrl: './box-header.component.html',
  styleUrls: ['./box-header.component.scss']
})

export class BoxHeaderComponent implements AfterViewInit {
  @Input() romBgHeader: string;
  @Input() romTitle: string;
  @Input() alwaysScroll: boolean;
  @Input() isMobile: boolean;

  ngAfterViewInit() {
    $('.small-text').css('font-size', '1vw');
  }
}
