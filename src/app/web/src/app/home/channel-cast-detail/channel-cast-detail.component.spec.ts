import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelCastDetailComponent } from './channel-cast-detail.component';

describe('ChannelCastDetailComponent', () => {
  let component: ChannelCastDetailComponent;
  let fixture: ComponentFixture<ChannelCastDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelCastDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelCastDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
