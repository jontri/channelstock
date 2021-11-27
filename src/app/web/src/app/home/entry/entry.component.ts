import { Component } from '@angular/core';
import {ActivatedRoute, UrlSegment} from '@angular/router';
import { ResponsiveService } from '@shared/services';

@Component({
  selector: 'rom-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent {
  headerDescription: string;

  constructor(
    private route: ActivatedRoute,
    public responsiveService: ResponsiveService
  ) {
    route.url.subscribe(this.extractHeaderDescription.bind(this));
  }

  private extractHeaderDescription(url: UrlSegment): void {

    if (url[0]) {
      switch (url[0].path) {
        case 'session-expired': {
          this.headerDescription = 'Session Expired';
          break;
        }
        case 'invalid-token': {
          this.headerDescription = 'Token Expired';
          break;
        }

      }
    } else {
      this.headerDescription = 'The Universe is emerging.';
    }

  }
}
