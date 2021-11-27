import { Component } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    @Component({selector: 'rom-nav', template: ''})
    class NavStubComponent {}
    // tslint:disable-next-line:component-selector
    @Component({selector: 'router-outlet', template: ''})
    class RouterStubComponent {}

    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavStubComponent,
        RouterStubComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeDefined();
  });
});
