import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoadshowLocationComponent } from './add-roadshow-location.component';

describe('AddRoadshowLocationComponent', () => {
  let component: AddRoadshowLocationComponent;
  let fixture: ComponentFixture<AddRoadshowLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRoadshowLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRoadshowLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
