import { Component, Input} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import { MoversComponent } from './movers.component';
import { MoversService } from '@api';
import { Mover } from '@models';

describe('MoversComponent', () => {
  let component: MoversComponent;
  let fixture: ComponentFixture<MoversComponent>;
  let nativeElem: HTMLElement;
  let getMoversSpy: Observable<Mover>;

  const movers: Mover = {
    actives: [
      {
        stockName: 'Coke Inc.',
        newPrice: 1.00,
        oldPrice: .95,
        percentMove: 0.05
      }
    ],
    losers: [
      {
        stockName: 'Clothes Co.',
        newPrice: 5.00,
        oldPrice: 9.95,
        percentMove: -4
      }
    ],
    winners: [
      {
        stockName: 'Aero Inc.',
        newPrice: 7.00,
        oldPrice: 5.95,
        percentMove: 1.05
      }
    ]
  };

  beforeEach(async(() => {
    @Component({selector: 'rom-box-header', template: ''})
    class BoxHeaderStubComponent {}
    @Component({selector: 'rom-tabs', template: ''})
    class TabsStubComponent {
      @Input() items: any[];
      @Input() tabId: string;
      @Input() color: string;
    }

    const moversService = jasmine.createSpyObj('MoversService', ['getMovers']);
    getMoversSpy = moversService.getMovers.and.returnValue(of(movers));

    TestBed.configureTestingModule({
      declarations: [
        MoversComponent,
        BoxHeaderStubComponent,
        TabsStubComponent
      ],
      providers: [
        {provide: MoversService, useValue: moversService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoversComponent);
    component = fixture.componentInstance;
    nativeElem = fixture.nativeElement;
  });

  it('should initialize', () => {
    fixture.detectChanges();
    expect(component).toBeDefined();
    expect(nativeElem.innerHTML).toContain('rombgheader="rom-bg-japanese-laurel" romtitle="Movers"');
  });
});
