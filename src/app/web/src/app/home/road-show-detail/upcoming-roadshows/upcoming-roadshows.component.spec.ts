import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingRoadshowsComponent } from './upcoming-roadshows.component';

describe('UpcomingRoadshowsComponent', () => {
  let component: UpcomingRoadshowsComponent;
  let fixture: ComponentFixture<UpcomingRoadshowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpcomingRoadshowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingRoadshowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
