import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmodComponent } from './qmod.component';

describe('QmodComponent', () => {
  let component: QmodComponent;
  let fixture: ComponentFixture<QmodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
