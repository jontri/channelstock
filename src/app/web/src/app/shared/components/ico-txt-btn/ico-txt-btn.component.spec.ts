import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcoTxtBtnComponent } from './ico-txt-btn.component';

describe('IcoTxtBtnComponent', () => {
  let component: IcoTxtBtnComponent;
  let fixture: ComponentFixture<IcoTxtBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcoTxtBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcoTxtBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
