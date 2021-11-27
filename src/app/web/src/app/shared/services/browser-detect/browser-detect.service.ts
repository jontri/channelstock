import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrowserDetectService {
  // Add more browsers to detect.
  isIe(): boolean {
    return /msie\s|trident\/|edge\//i.test(window.navigator.userAgent);
  }
}
