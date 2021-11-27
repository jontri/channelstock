import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelCastComponent } from './channel-cast.component';

describe('ChannelCastComponent', () => {
  let component: ChannelCastComponent;
  let fixture: ComponentFixture<ChannelCastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelCastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelCastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
