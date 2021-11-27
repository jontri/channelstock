import { Component, ElementRef, AfterViewInit, Input } from '@angular/core';
 
@Component({
    selector: 'google-plus',
    templateUrl: './google-plus.component.html',
    styleUrls: ['./google-plus.component.scss']
})
 
export class GooglePlusComponent implements AfterViewInit {
    @Input() url = location.href;
 
    constructor() {
        // load google plus sdk if required
        const url = 'https://apis.google.com/js/platform.js';
        if (!document.querySelector(`script[src='${url}']`)) {
            let script = document.createElement('script');
            script.src = url;
            document.body.appendChild(script);
        }
    }
 
    ngAfterViewInit(): void {
        // render google plus button
        window['gapi'] && window['gapi'].plusone.go();
    }

    navigate(){
       // window.open(this.url, '_blank');
    }
}