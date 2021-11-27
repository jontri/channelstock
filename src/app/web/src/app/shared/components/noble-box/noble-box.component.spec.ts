import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NobleBoxComponent } from './noble-box.component';

describe('NobleBoxComponent', () => {
  let component: NobleBoxComponent;
  let fixture: ComponentFixture<NobleBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NobleBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NobleBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
