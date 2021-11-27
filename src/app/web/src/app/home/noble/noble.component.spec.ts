import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NobleComponent } from './noble.component';

describe('NobleComponent', () => {
  let component: NobleComponent;
  let fixture: ComponentFixture<NobleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NobleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NobleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
