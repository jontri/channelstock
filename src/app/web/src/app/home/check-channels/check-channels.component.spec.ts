import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Observable } from 'rxjs';

import { CheckChannelsComponent } from './check-channels.component';
import { CheckChannelsService } from '@api';
import { Channel, Company } from '@models';
import {ChannelCastComponent} from "../channel-cast/channel-cast.component";

describe('CheckChannelsComponent', () => {
  let component: CheckChannelsComponent;
  let fixture: ComponentFixture<CheckChannelsComponent>;

  const channels: Channel[] = [
    {id: 1, name: 'Research Levels', sector: 0, subsector: 0},
    {id: 2, name: 'Explore', sector: 1, subsector: 0}
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelCastComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckChannelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
