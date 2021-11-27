import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import {Company, ResearchReport} from '@models';

@Component({
  selector: 'rom-research-disclosure',
  templateUrl: './research-disclosure.component.html',
  styleUrls: ['./research-disclosure.component.scss']
})
export class ResearchDisclosureComponent implements OnInit {
  @Input() company: Company;
  @Input() report: ResearchReport;
  constructor() { }

  ngOnInit() {
  }


}
