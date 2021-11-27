import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NobleConComponent } from './noble-con.component';

describe('NobleConComponent', () => {
  let component: NobleConComponent;
  let fixture: ComponentFixture<NobleConComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NobleConComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NobleConComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
