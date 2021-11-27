import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationInputsComponent } from './registration-inputs.component';

describe('RegistrationInputsComponent', () => {
  let component: RegistrationInputsComponent;
  let fixture: ComponentFixture<RegistrationInputsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationInputsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
