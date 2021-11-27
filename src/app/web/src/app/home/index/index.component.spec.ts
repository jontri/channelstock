import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import { IndexComponent } from './index.component';
import { NobleIndexService } from '@api';
import { NobleIndex } from '@models';

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;
  let nativeElem: HTMLElement;
  let getNobleIndexListSpy: Observable<NobleIndex[]>;

  const indexList: NobleIndex[] = [
    {
      stockName: 'Avino Silver & Gold',
      currentPrice: 1.34,
      percentChange: 2.2
    },
    {
      stockName: 'Balmoral Resources',
      currentPrice: 0.28,
      percentChange: 2.2
    }
  ];

  beforeEach(async(() => {
    @Component({selector: 'rom-box-header', template: ''})
    class BoxHeaderStubComponent {}

    const nobleIndexService = jasmine.createSpyObj('NobleIndexService', ['getNobleIndexList']);
    getNobleIndexListSpy = nobleIndexService.getNobleIndexList.and.returnValue(of(indexList));

    TestBed.configureTestingModule({
      declarations: [
        IndexComponent,
        BoxHeaderStubComponent
      ],
      providers: [
        {provide: NobleIndexService, useValue: nobleIndexService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    nativeElem = fixture.nativeElement;
  });

  it('should initialize', () => {
    fixture.detectChanges();
    expect(component).toBeDefined();
    expect(nativeElem.innerHTML).toContain('rombgheader="rom-bg-blaze-orange" romtitle="NobleEG Index"');
  });
});
