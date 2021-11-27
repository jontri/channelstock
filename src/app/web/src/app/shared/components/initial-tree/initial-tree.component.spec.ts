import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialTreeComponent } from './initial-tree.component';

describe('InitialTreeComponent', () => {
  let component: InitialTreeComponent;
  let fixture: ComponentFixture<InitialTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitialTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
