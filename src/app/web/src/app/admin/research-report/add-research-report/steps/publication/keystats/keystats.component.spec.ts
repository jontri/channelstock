import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeystatsComponent } from './keystats.component';

describe('KeystatsComponent', () => {
  let component: KeystatsComponent;
  let fixture: ComponentFixture<KeystatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeystatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeystatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
