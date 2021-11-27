import * as $ from 'jquery';
import { Component, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute, Data, NavigationEnd } from '@angular/router';
import { LoginService } from '@api';
import { AuthService, UtilsService, OverlayService, ResponsiveService } from '@shared/services';
import { ScrollStrategyOptions, OverlayRef, ConnectionPositionPair } from '@angular/cdk/overlay';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { trigger, style, transition, animate } from '@angular/animations';
import { UserTrackActivityService } from '@shared/services/user-track-activity/user-track-activity.service';
import { filter } from 'rxjs/operators';

@Component({
 selector: 'rom-nav',
 templateUrl: './nav.component.html',
 styleUrls: ['./nav.component.scss'],
 animations: [
  trigger('enterAnimationRight', [
    transition(':enter', [
      style({transform: 'translateX(100%)', opacity: 0}),
      animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
    ]),
    transition(':leave', [
      style({transform: 'translateX(0)', opacity: 1}),
      animate('500ms', style({transform: 'translateX(100%)', opacity: 0}))
    ])
  ]),
  trigger('enterAnimationLeft', [
    transition(':enter', [
      style({transform: 'translateX(-100%)', opacity: 0}),
      animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
    ]),
    transition(':leave', [
      style({transform: 'translateX(0%)', opacity: 1}),
      animate('500ms', style({transform: 'translateX(-100%)', opacity: 0}))
    ])
  ])
 ]
})

export class NavComponent implements AfterViewInit {
  @ViewChild('nav') navElem: ElementRef;
  @ViewChild('logo') logoElem: ElementRef;
  @ViewChild('menuBtn') menuBtnElem: ElementRef;

  user: string;
  loggedIn: boolean;
  adminView: Boolean = false;
  overlayElem: JQuery;
  overlayRef: OverlayRef;
  isScrolled: Boolean = false;
  isAdmin: boolean;
  todaysDate: Date;
  showDate: boolean;
  isModalOpen: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private utilsService: UtilsService,
    public loginService: LoginService,
    public authService: AuthService,
    private overlayService: OverlayService,
    private scrollStrategyOptions: ScrollStrategyOptions,
    private trackActivityService: UserTrackActivityService,
    public responsiveService: ResponsiveService
  ) {
    this.loggedIn = false;

    router.events.subscribe((url: any) => {
      if (router.url.includes('/admin') && router.url.indexOf('/admin') === 0) {
        this.adminView = true;
      } else {
        this.adminView = false;
      }
    });
    router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      if (this.responsiveService.isMobile) {
        utilsService.getLastRouteChild(router.routerState.root).data.subscribe((data: Data) => {
          this.showDate = data.showDate;
          if (this.navElem) {
            setTimeout(() => {
              this.utilsService.navbar.next(this.navElem);
            });
          }
        });
      }
    });
    this.todaysDate = new Date();
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    // console.log(number);

    if (!this.isScrolled) {
      this.isScrolled = true;
      setTimeout(() => {
        this.isScrolled = false;
      }, 2500);
    }
  }

  ngAfterViewInit() {
    if (this.navElem) {
      this.logoElem.nativeElement.onload = () => this.utilsService.navbar.next(this.navElem);
      this.navElem.nativeElement.classList.add('fixed-top');
    }
  }

  toggleLoggedIn(event?: MouseEvent) {

    if (this.loginService.isAuthenticated) {
      this.loginService.logout();
      this.authService.loggedUser = '';
      this.authService.loggedUserFullName = '';
      this.loginService.loginListener.next('emit');
      this.trackActivityService.stop();
      this.router.navigate(['/']);
    } else {
      this.authService.toggleRegister();
    }
    if (event) {
      event.preventDefault();
    }
  }

  showMenu(): void {
    const positionStrategy = this.overlayService.positionBuilder.flexibleConnectedTo(this.menuBtnElem);
    const sharedPos: ConnectionPositionPair = {
      originY: 'top', overlayY: 'top', originX: 'end', overlayX: 'end', offsetX: 0, offsetY: this.menuBtnElem.nativeElement.offsetHeight
    };
    if (this.responsiveService.isMobile) {
      sharedPos.originX = sharedPos.overlayX = 'start';
    }
    positionStrategy.positions.push(sharedPos);

    this.overlayRef = this.overlayService.create({
      backdropClass: 'rom-clear-overlay',
      hasBackdrop: true,
      positionStrategy,
      scrollStrategy: this.scrollStrategyOptions.noop(),
      panelClass: this.responsiveService.isMobile ? 'rom-mobile-panel' : ''
    });

    if (!this.overlayElem) {
      this.overlayElem = $(this.overlayService.containerElement);
    }
    this.overlayElem.on('click contextmenu', this.closeOverlay.bind(this));
    const componentRef = this.overlayService.attachComponent(this.overlayRef, NavMenuComponent);
    componentRef.instance.loggedOut.subscribe(() => this.toggleLoggedIn());
  }

  private closeOverlay(): void {
    this.overlayRef.detach();
    this.overlayRef.dispose();
    this.overlayElem.off('click contextmenu');
  }

  openDialog(url){
    window.open(url, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=200,width=1000,height=700");
  }
}
