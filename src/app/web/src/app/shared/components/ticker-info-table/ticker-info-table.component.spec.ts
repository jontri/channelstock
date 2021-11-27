import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TickerInfoTableComponent } from './ticker-info-table.component';

describe('TickerInfoTableComponent', () => {
  let component: TickerInfoTableComponent;
  let fixture: ComponentFixture<TickerInfoTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TickerInfoTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TickerInfoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
