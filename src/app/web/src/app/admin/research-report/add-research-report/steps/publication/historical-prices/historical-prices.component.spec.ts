import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalPricesComponent } from './historical-prices.component';

describe('HistoricalPricesComponent', () => {
  let component: HistoricalPricesComponent;
  let fixture: ComponentFixture<HistoricalPricesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricalPricesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricalPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
