import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

declare var gtag: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {
  private static readonly GA_TRACKING_ID = 'UA-48900086-27';

  constructor(
    @Inject(DOCUMENT) private document: HTMLDocument
  ) {
    const headTag = document.getElementsByTagName('head')[0];
    const gTagScript = document.createElement('script');
    gTagScript.async = true;
    gTagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GoogleAnalyticsService.GA_TRACKING_ID}`;
    headTag.appendChild(gTagScript);

    const gtagInitScript = document.createElement('script');
    gtagInitScript.text = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GoogleAnalyticsService.GA_TRACKING_ID}', { 'send_page_view': false });
    `;
    headTag.appendChild(gtagInitScript);
  }

  track(page_path: string): void {
    gtag('config', GoogleAnalyticsService.GA_TRACKING_ID, {page_path});
  }
}
