import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelCastBlockerComponent } from './channel-cast-blocker.component';

describe('AgreementPopupComponent', () => {
  let component: ChannelCastBlockerComponent;
  let fixture: ComponentFixture<ChannelCastBlockerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelCastBlockerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelCastBlockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
