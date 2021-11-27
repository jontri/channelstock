import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import { WatchListComponent } from './watch-list.component';
import { WatchListService } from '@api';
import { WatchList } from '@models';

describe('WatchListComponent', () => {
  let component: WatchListComponent;
  let fixture: ComponentFixture<WatchListComponent>;
  let nativeElem: HTMLElement;
  let getWatchListSpy: Observable<WatchList[]>;

  const watchList: WatchList[] = [
    {
      id: 1,
      company: {
        id: 1,
        ticker: {
          id: 1,
          symbol: 'ASM',
          currentPrice: 2.75,
          previousPrice: 2.75,
          marketCap: 1000
        },
        companyName: 'Avino Silver & Gold',
        logoUrl: 'avino-logo.jpg',
        roadshowLogoUrl: 'avino-logo.jpg',
        rating: 'BUY',
        targetPrice: '2.75',
        currentPrice: '2.75',
        marketCap: '1000',
        yearWeekRange: '52',
        isAddedToWatchList: false
      },
      percentChange: 1.2
    },
    {
      id: 2,
      company: {
        id: 2,
        ticker: {
          id: 1,
          symbol: 'BAR',
          currentPrice: 0,
          previousPrice: 0,
          marketCap: 1000
        },
        companyName: 'Balmoral Resources',
        logoUrl: 'balmoral-logo.jpg',
        roadshowLogoUrl: 'balmoral-logo.jpg',
        rating: 'HOLD',
        targetPrice: '0',
        currentPrice: '0',
        marketCap: '1000',
        yearWeekRange: '52',
        isAddedToWatchList: true
      },
      percentChange: 1.2
    }
  ];

  beforeEach(async(() => {
    @Component({selector: 'rom-box-header', template: ''})
    class BoxHeaderStubComponent {}

    const watchListService = jasmine.createSpyObj('WatchListService', ['getWatchList']);
    getWatchListSpy = watchListService.getWatchList.and.returnValue(of(watchList));

    TestBed.configureTestingModule({
      declarations: [
        WatchListComponent,
        BoxHeaderStubComponent
      ],
      providers: [
        {provide: WatchListService, useValue: watchListService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchListComponent);
    component = fixture.componentInstance;
    nativeElem = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should initialize', () => {
    expect(component).toBeDefined();
    expect(nativeElem.innerHTML).toContain('rombgheader="rom-bg-blue-marguerite" romtitle="My Favorites"');
  });
});
