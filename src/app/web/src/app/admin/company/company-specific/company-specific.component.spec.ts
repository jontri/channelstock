import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySpecificComponent } from './company-specific.component';

describe('CompanySpecificComponent', () => {
  let component: CompanySpecificComponent;
  let fixture: ComponentFixture<CompanySpecificComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanySpecificComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanySpecificComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
