import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementPopupComponent } from './agreement-popup.component';

describe('AgreementPopupComponent', () => {
  let component: AgreementPopupComponent;
  let fixture: ComponentFixture<AgreementPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgreementPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreementPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
