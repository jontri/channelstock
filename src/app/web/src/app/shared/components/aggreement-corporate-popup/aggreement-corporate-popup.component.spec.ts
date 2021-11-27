import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AggreementCorporatePopupComponent } from './aggreement-corporate-popup.component';

describe('AggreementCorporatePopupComponent', () => {
  let component: AggreementCorporatePopupComponent;
  let fixture: ComponentFixture<AggreementCorporatePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AggreementCorporatePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AggreementCorporatePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
