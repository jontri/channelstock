import { Component, Directive, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Observable } from 'rxjs';

import { CompaniesComponent } from './companies.component';
import { CompanyService, WatchListService } from '@api';
import { Company } from '@models';

describe('CompaniesComponent', () => {
  let component: CompaniesComponent;
  let fixture: ComponentFixture<CompaniesComponent>;
  let nativeElem: HTMLElement;
  let getCompaniesSpy: Observable<Company[]>;

  const companies: Company[] = [
    {
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
    {
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
    }
  ];

  beforeEach(async(() => {
    @Component({selector: 'rom-box-header', template: ''})
    class BoxHeaderStubComponent {}

    @Directive({selector: '[romContextMenu]'})
    class ContextMenuStubDirective {
      @Input() data: any;
      @Input() component: any;
    }

    const companyService = jasmine.createSpyObj('CompanyService', ['getCompanies']);
    getCompaniesSpy = companyService.getCompanies.and.returnValue(of(companies));

    const watchListService = jasmine.createSpyObj('WatchListService', ['addItemToWatchList']);

    TestBed.configureTestingModule({
      declarations: [
        CompaniesComponent,
        BoxHeaderStubComponent,
        ContextMenuStubDirective
      ],
      providers: [
        {provide: CompanyService, useValue: companyService},
        {provide: WatchListService, useValue: watchListService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaniesComponent);
    component = fixture.componentInstance;
    nativeElem = fixture.nativeElement;
  });

  it('should initialize', () => {
    fixture.detectChanges();
    expect(component).toBeDefined();
    expect(nativeElem.innerHTML).toContain('rombgheader="rom-bg-minsk" romtitle="Companies"');
  });
});
