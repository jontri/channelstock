import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NobleConDetailComponent } from './noble-con-detail.component';

describe('NobleConDetailComponent', () => {
  let component: NobleConDetailComponent;
  let fixture: ComponentFixture<NobleConDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NobleConDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NobleConDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
