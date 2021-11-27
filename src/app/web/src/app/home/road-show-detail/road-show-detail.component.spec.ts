import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadShowDetailComponent } from './road-show-detail.component';

describe('RoadShowDetailComponent', () => {
  let component: RoadShowDetailComponent;
  let fixture: ComponentFixture<RoadShowDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoadShowDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadShowDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
