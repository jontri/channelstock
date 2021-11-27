import { Component, OnInit, AfterViewInit } from '@angular/core';
import { WatchList, MenuItem } from '@models';
import { WatchListService } from '@api';
import { DropdownMenuComponent } from '@shared/components';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { Location } from '@angular/common';
import { AuxiliaryGuard } from '../auxiliary-guard/auxiliary.guard';
import { LoginService } from '@api';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'rom-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.scss']
})

export class WatchListComponent implements OnInit, AfterViewInit {
  menuItems: MenuItem[][];
  dropdownMenuComponent: any;
  isExpanded: boolean;
  isLoggedIn = false;
  widgetWidth: number;
  widgetHeight: number;

  constructor(
    public watchListService: WatchListService,
    private router: Router,
    private route: ActivatedRoute,
    public location: Location,
    public aux: AuxiliaryGuard,
    public loginService: LoginService,
    private el: ElementRef
  ) {
    this.menuItems = [];
    this.dropdownMenuComponent = DropdownMenuComponent;
    this.route.data.subscribe((data: Data) => this.isExpanded = data.isExpanded);
    this.loginListener();
  }

  ngOnInit() {
    this.getWatchList();
    this.widgetWidth = this.el.nativeElement.offsetWidth;
    this.widgetHeight = this.el.nativeElement.offsetHeight + 750;
  }

  ngAfterViewInit() {
    $(function () {
      (<any>$('[data-toggle="tooltip"]')).tooltip();
    });
  }

  getWatchList() {
    this.watchListService.getWatchList().subscribe(
      watchList => {
        this.buildMenuItems();
        this.subscribeWatchListEvents();
      }
    );
  }

  loginListener() {
    this.loginService.loginListener.subscribe(
      emitter => {
        this.ngOnInit();
      }
    );
  }

  removeItem(stockSymbol: string) {
    // console.log('watch list removal stockName: ' + stockSymbol);
    this.watchListService.removeItemFromWatchList(stockSymbol).subscribe();
  }

  private buildMenuItems(): void {
    this.watchListService.watchList.forEach((watcher, index) => {
      this.menuItems[index] = this.generateMenuItem(watcher);
    });
  }

  private subscribeWatchListEvents(): void {
    this.watchListService.addEventEmitter.subscribe((watcher: WatchList) => {
      this.menuItems.push(this.generateMenuItem(watcher));
    });

    this.watchListService.removeEventEmitter.subscribe((index: number) => {
      this.menuItems.splice(index, 1);
    });
  }

  private generateMenuItem(watcher: WatchList): MenuItem[] {
    return [
      {
        label: 'To Company',
        action: () => {
          this.router.navigate([`company/${watcher.company.symbol}`]);
        }
      },
      {
        label: 'Remove from My Favorites',
        action: () => {
          this.removeItem(watcher.company.symbol);
        }
      }
    ];
  }

  expand(toggle) {
    this.watchListService.expandListener.next(toggle);
  }


}
