import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyImgComponent } from './company-img.component';

describe('CompanyImgComponent', () => {
  let component: CompanyImgComponent;
  let fixture: ComponentFixture<CompanyImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
