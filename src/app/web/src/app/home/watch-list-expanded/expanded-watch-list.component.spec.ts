import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandedWatchListComponent } from './expanded-watch-list.component';

describe('ExpandedWatchListComponent', () => {
  let component: ExpandedWatchListComponent;
  let fixture: ComponentFixture<ExpandedWatchListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpandedWatchListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandedWatchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
