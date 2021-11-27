import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AggreementRoadshowPopupComponent } from './aggreement-roadshow-popup.component';

describe('AggreementRoadshowPopupComponent', () => {
  let component: AggreementRoadshowPopupComponent;
  let fixture: ComponentFixture<AggreementRoadshowPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AggreementRoadshowPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AggreementRoadshowPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
