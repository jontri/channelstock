import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetTheManagementBlockerComponent } from './meet-the-management-blocker.component';

describe('AgreementPopupComponent', () => {
  let component: MeetTheManagementBlockerComponent;
  let fixture: ComponentFixture<MeetTheManagementBlockerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetTheManagementBlockerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetTheManagementBlockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
