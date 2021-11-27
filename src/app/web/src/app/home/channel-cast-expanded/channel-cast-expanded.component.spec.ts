import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelCastExpandedComponent } from './channel-cast-expanded.component';

describe('ChannelCastExpandedComponent', () => {
  let component: ChannelCastExpandedComponent;
  let fixture: ComponentFixture<ChannelCastExpandedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelCastExpandedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelCastExpandedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
