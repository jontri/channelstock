import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EarningsPerShareComponent } from './earnings-per-share.component';

describe('EarningsPerShareComponent', () => {
  let component: EarningsPerShareComponent;
  let fixture: ComponentFixture<EarningsPerShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EarningsPerShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EarningsPerShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
