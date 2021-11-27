import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextboxioComponent } from './textboxio.component';

describe('TextboxioComponent', () => {
  let component: TextboxioComponent;
  let fixture: ComponentFixture<TextboxioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextboxioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextboxioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
