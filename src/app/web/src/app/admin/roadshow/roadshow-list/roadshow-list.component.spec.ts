import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadshowListComponent } from './roadshow-list.component';

describe('RoadshowListComponent', () => {
  let component: RoadshowListComponent;
  let fixture: ComponentFixture<RoadshowListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoadshowListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadshowListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
