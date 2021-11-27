import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import {Http} from '@angular/http';
import { trigger, style, animate, transition } from '@angular/animations';
import { DomSanitizer } from '@angular/platform-browser';
import { DocumentService } from '@api';
import { ResponsiveService } from '@shared/services';

@Component({
  selector: 'rom-disclosure-popup',
  templateUrl: './disclosure-popup.component.html',
  styleUrls: ['./disclosure-popup.component.scss'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]


})
export class DisclosurePopupComponent implements OnInit, OnChanges {

  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() disclosure: any;
  @Input() isExcess: boolean;

  filename: any;
  documentToShow: any;
  htmldata: any;
  constructor(
    private httpClient: Http,
    private documentService: DocumentService,
    private sanitizer: DomSanitizer,
    public responsiveService: ResponsiveService
  ) {
    this.disclosure = this.disclosure;

  }

  ngOnInit() {
    this.disclosure = this.disclosure;
    this.filename = this.disclosure;
    this.getDocumentFromService();
  }

  ngOnChanges() {
    this.disclosure = this.disclosure;
  }

  getDocumentFromService() {
    this.documentService.getDocumentFooter().subscribe(data => {
      this.htmldata = this.sanitizer.bypassSecurityTrustHtml(data);
    }, error => {
      console.log(error);
    });
  }
/*
  getDocumentFromService(disclosureType:string) {
    console.log( 'service : ' + disclosureType);
    if( disclosureType ==='footer'){
      this.documentService.getDocumentFooter().subscribe(data => {
        this.htmldata = this.sanitizer.bypassSecurityTrustHtml(data);
      }, error => {
        console.log(error);
      });
    } else{
      this.documentService.getDocument('Conditions.html').subscribe(data => {
        this.htmldata = this.sanitizer.bypassSecurityTrustHtml(data);
      }, error => {
        console.log(error);
      });
    }
  }
*/
  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}

