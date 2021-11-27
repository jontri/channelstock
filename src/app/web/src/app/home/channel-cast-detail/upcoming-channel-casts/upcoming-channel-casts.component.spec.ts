import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingChannelCastsComponent } from './upcoming-channel-casts.component';

describe('UpcomingChannelCastsComponent', () => {
  let component: UpcomingChannelCastsComponent;
  let fixture: ComponentFixture<UpcomingChannelCastsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpcomingChannelCastsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingChannelCastsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
