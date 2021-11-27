import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import { RoadShowsComponent } from './road-shows.component';
import { RoadShowService } from '@api';
import { RoadShow } from '@models';

describe('RoadShowsComponent', () => {
  let component: RoadShowsComponent;
  let fixture: ComponentFixture<RoadShowsComponent>;
  let nativeElem: HTMLElement;
  let getRoadShowsSpy: Observable<RoadShow[]>;

  const roadShows: RoadShow[] = [
    {
      id: 1,
      city: 'Chicago',
      schedule: '2018-05-26T00:14:53.525-04:00',
      seats: '3',
      companyName: 'ASM'
    },
    {
      id: 2,
      city: 'New York',
      schedule: '2018-05-26T00:14:53.525-04:00',
      seats: '3',
      companyName: 'SNOA'
    }
  ];

  beforeEach(async(() => {
    @Component({selector: 'rom-box-header', template: ''})
    class BoxHeaderStubComponent {}

    const roadShowService = jasmine.createSpyObj('RoadShowService', ['getRoadShows']);
    getRoadShowsSpy = roadShowService.getRoadShows.and.returnValue(of(roadShows));

    TestBed.configureTestingModule({
      declarations: [
        RoadShowsComponent,
        BoxHeaderStubComponent
      ],
      providers: [
        {provide: RoadShowService, useValue: roadShowService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadShowsComponent);
    component = fixture.componentInstance;
    nativeElem = fixture.nativeElement;
  });

  it('should initialize', () => {
    fixture.detectChanges();
    expect(component).toBeDefined();
    expect(nativeElem.innerHTML).toContain('rombgheader="rom-bg-caribbean-green" romtitle="Open Road Shows"');
  });
});
