import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavComponent } from './nav.component';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let nativeElem: HTMLElement;

  const loggedInSelector = '.flex-column .d-flex > a';

  beforeEach(async(() => {
    @Component({selector: 'rom-search-box', template: ''})
    class SearchBoxStubComponent {}

    TestBed.configureTestingModule({
      declarations: [
        NavComponent,
        SearchBoxStubComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    nativeElem = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should initialize', () => {
    expect(component).toBeDefined();
    expect(nativeElem.getElementsByTagName('nav').length).toBe(1);
    expect(nativeElem.querySelectorAll('.navbar-brand').length).toBe(1);
    expect(nativeElem.querySelectorAll('.nav-item').length).toBe(8);
    expect(nativeElem.querySelector(loggedInSelector).textContent).toBe('Sign Out');

    expect(component.user).toBe('Mark');
    expect(component.loggedIn).toBe(true);
  });

  it('should toggle logged in', () => {
    component.toggleLoggedIn();
    expect(component.loggedIn).toBe(false);

    fixture.detectChanges();
    expect(nativeElem.querySelector(loggedInSelector).textContent).toBe('Sign In');
  });
});
