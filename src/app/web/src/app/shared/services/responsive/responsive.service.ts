import { Injectable } from '@angular/core';

type mediaProp = {
  active: boolean;
  size: string;
};

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {
  private mediaHash: {[key: string]: mediaProp} = {
    '(max-width: 575.98px)': {
      active: false,
      size: 'xs'
    },
    '(max-width: 767.98px) and (min-width: 576px)': {
      active: false,
      size: 'sm'
    },
    '(max-width: 991.98px) and (min-width: 768px)': {
      active: false,
      size: 'md'
    },
    '(max-width: 1199.98px) and (min-width: 992px)': {
      active: false,
      size: 'lg'
    },
    '(min-width: 1200px)': {
      active: false,
      size: 'xl'
    }
  };
  private mediaKeys: string[];

  constructor() {
    this.mediaKeys = Object.keys(this.mediaHash);
    this.mediaKeys.forEach((media) => {
      const mql = window.matchMedia(media);
      this.checkScreen(mql, media);
      mql.addListener(this.checkScreen.bind(this));
    });
  }

  private checkScreen(e: MediaQueryList, media?: string): void {
    if (!this.mediaHash[e.media]) {
      this.mediaHash[e.media] = this.mediaHash[media];
      this.mediaKeys.push(e.media);
    }
    this.mediaHash[e.media].active = e.matches;
  }

  get isMobile(): boolean {
    return this.mediaKeys.some((key: string) => {
      return this.mediaHash[key].active && /(xs)|(sm)|(md)/.test(this.mediaHash[key].size);
    });
  }
}
