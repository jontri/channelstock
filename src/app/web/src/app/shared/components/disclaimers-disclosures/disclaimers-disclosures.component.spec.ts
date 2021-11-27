import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisclaimersDisclosuresComponent } from './disclaimers-disclosures.component';

describe('DisclaimersDisclosuresComponent', () => {
  let component: DisclaimersDisclosuresComponent;
  let fixture: ComponentFixture<DisclaimersDisclosuresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisclaimersDisclosuresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisclaimersDisclosuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
