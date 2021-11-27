import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NobleDetailComponent } from './noble-detail.component';

describe('NobleDetailComponent', () => {
  let component: NobleDetailComponent;
  let fixture: ComponentFixture<NobleDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NobleDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NobleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
