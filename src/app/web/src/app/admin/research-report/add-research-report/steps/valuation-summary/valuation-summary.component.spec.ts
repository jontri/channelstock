import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValuationSummaryComponent } from './valuation-summary.component';

describe('ValuationSummaryComponent', () => {
  let component: ValuationSummaryComponent;
  let fixture: ComponentFixture<ValuationSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValuationSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValuationSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
