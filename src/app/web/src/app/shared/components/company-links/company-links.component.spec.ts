import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyLinksComponent } from './company-links.component';

describe('CompanyLinksComponent', () => {
  let component: CompanyLinksComponent;
  let fixture: ComponentFixture<CompanyLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
