import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoversExpandedComponent } from './movers-expanded.component';

describe('MoversExpandedComponent', () => {
  let component: MoversExpandedComponent;
  let fixture: ComponentFixture<MoversExpandedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoversExpandedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoversExpandedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
