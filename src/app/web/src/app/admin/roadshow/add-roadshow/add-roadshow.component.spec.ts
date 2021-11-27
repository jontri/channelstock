import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoadshowComponent } from './add-roadshow.component';

describe('AddRoadshowComponent', () => {
  let component: AddRoadshowComponent;
  let fixture: ComponentFixture<AddRoadshowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRoadshowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRoadshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
