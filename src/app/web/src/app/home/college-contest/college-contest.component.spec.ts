import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeContestComponent } from './college-contest.component';

describe('CollegeContestComponent', () => {
  let component: CollegeContestComponent;
  let fixture: ComponentFixture<CollegeContestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollegeContestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegeContestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
