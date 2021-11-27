import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationMainComponent } from './publication-main.component';

describe('PublicationMainComponent', () => {
  let component: PublicationMainComponent;
  let fixture: ComponentFixture<PublicationMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
