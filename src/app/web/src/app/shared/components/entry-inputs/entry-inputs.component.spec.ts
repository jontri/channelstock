import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryInputsComponent } from './entry-inputs.component';

describe('EntryInputsComponent', () => {
  let component: EntryInputsComponent;
  let fixture: ComponentFixture<EntryInputsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryInputsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
