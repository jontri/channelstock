import { Component, OnInit } from '@angular/core';
import { Router, Event, ActivatedRoute, Data, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { UtilsService, ResponsiveService } from '@shared/services';
import { LoginService } from '@api';
import { trigger, style, animate, transition} from '@angular/animations';
declare var $: any;

@Component({
  selector: 'rom-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({opacity: 0}),
        animate(500, style({opacity: 1}))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(500, style({opacity: 0}))
      ])
    ])
  ]
})
export class FooterComponent implements OnInit {
  private hideNoticeHash = {
    '': true,
    'registration': true
  };
  private hideNotice = false;
  isLoggedIn = false;
  // disclosure: any;
  linkCopied: Boolean = false;

  showDialog = false;
  disclosure = false;
  topElement;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private utils: UtilsService,
    private loginService: LoginService,
    public responsiveService: ResponsiveService
  ) {
    router.events.pipe(
      // Only subscribe to NavigationEnd event.
      filter((event: Event) => {
        return event instanceof NavigationEnd;
      })
    ).subscribe(() => {
      utils.getLastActivatedChild(route).data.subscribe((data: Data) => {
        // Hide notice text when footer data is available and hideNotice is set to true.
        // this.hideNotice = data.footer && data.footer.hideNotice;
      });
    });
  }

  ngOnInit() {
    this.isLoggedIn = this.loginService.isAuthenticated;
    //this.disclosure = 'footer';
  }

  get isNoticeHidden(): boolean {
    return this.hideNotice || this.responsiveService.isMobile;
  }

  // onNavigate(site: string) {
  //     const link = 'docs/Conditions.html';
  //     window.open(link + '#' + site, 'ConditionsWindow', 'menubar=0, width=1000,height=700');
  // }

  copyLink(val) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();

    // selBox.setSelectionRange(0, selbox.value.length);
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.linkCopied = true;
    setTimeout(() => {
      this.linkCopied = false;
    }, 1500);
  }

  // Opens new dialog/window of a browser
  openDialog(url){

    window.open(url, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=200,width=1000,height=700");

  }

  openPopup($event){
    this.showDialog = !this.showDialog;
    $event.preventDefault();
    //
    this.scrollToSection('disclosures');
  }

  scrollToSection(section) {
    var elmnt = document.getElementById("relationships");
    elmnt.scrollIntoView(true);
  }




}
