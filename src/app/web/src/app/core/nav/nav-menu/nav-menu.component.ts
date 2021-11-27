import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ResponsiveService } from '@shared/services';

@Component({
  selector: 'rom-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  @Output() loggedOut: EventEmitter<void>;

  constructor(
    public responsiveService: ResponsiveService
  ) {
    this.loggedOut = new EventEmitter<void>();
  }

  ngOnInit() {
  }

}
