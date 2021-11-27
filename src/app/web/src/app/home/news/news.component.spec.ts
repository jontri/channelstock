import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import { NewsComponent } from './news.component';
import { NewsService } from '@api';
import { News } from '@models';

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;
  let nativeElem: HTMLElement;
  let getAllNewsSpy: Observable<News[]>;

  const news: News[] = [
    {
      id: 1,
      companyId: 2,
      title: 'What is bitcoin?',
      content: 'bitcoin is a cryptocurrency and worldwide payment system',
      category: 'TLY'
    }
  ];

  beforeEach(async(() => {
    @Component({selector: 'rom-box-header', template: ''})
    class BoxHeaderStubComponent {}

    const newsService = jasmine.createSpyObj('NewsService', ['getAllNews']);
    getAllNewsSpy = newsService.getAllNews.and.returnValue(of(news));

    TestBed.configureTestingModule({
      declarations: [
        NewsComponent,
        BoxHeaderStubComponent
      ],
      providers: [
        {provide: NewsService, useValue: newsService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
    nativeElem = fixture.nativeElement;
  });

  it('should initialize', () => {
    fixture.detectChanges();
    expect(component).toBeDefined();
    expect(nativeElem.innerHTML).toContain('rombgheader="rom-bg-cyan" romtitle="ChannelCASTS"');
  });
});
