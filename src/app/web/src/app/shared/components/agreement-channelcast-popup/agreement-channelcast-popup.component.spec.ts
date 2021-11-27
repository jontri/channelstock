import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementChannelcastPopupComponent } from './agreement-channelcast-popup.component';

describe('AgreementChannelcastPopupComponent', () => {
  let component: AgreementChannelcastPopupComponent;
  let fixture: ComponentFixture<AgreementChannelcastPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgreementChannelcastPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreementChannelcastPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
