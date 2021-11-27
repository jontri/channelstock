import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchBoxComponent } from './search-box.component';

describe('SearchBoxComponent', () => {
  let component: SearchBoxComponent;
  let fixture: ComponentFixture<SearchBoxComponent>;
  let nativeElem: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchBoxComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBoxComponent);
    component = fixture.componentInstance;
    nativeElem = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should initialize', () => {
    expect(component).toBeDefined();
    expect(nativeElem.getElementsByTagName('form').length).toBe(1);
    expect(nativeElem.getElementsByTagName('select').length).toBe(1);
    expect(nativeElem.getElementsByTagName('button').length).toBe(1);
  });
});

