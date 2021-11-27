import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsChannelDetailComponent } from './news-channel-detail.component';

describe('NewsChannelDetailComponent', () => {
  let component: NewsChannelDetailComponent;
  let fixture: ComponentFixture<NewsChannelDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsChannelDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsChannelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
