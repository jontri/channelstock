import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisclosurePopupComponent } from './disclosure-popup.component';

describe('DisclosurePopupComponent', () => {
  let component: DisclosurePopupComponent;
  let fixture: ComponentFixture<DisclosurePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisclosurePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisclosurePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
