import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BoxHeaderComponent } from './box-header.component';

describe('BoxHeaderComponent', () => {
  let component: BoxHeaderComponent;
  let fixture: ComponentFixture<BoxHeaderComponent>;
  let nativeElem: HTMLElement;

  const bodyClass = 'card',
    headerClass = 'card-header',
    contentClass = 'card-body';
  const bodyContent = 'content',
    bgHeader = 'blue',
    title = 'title';

  @Component({
    template: `<rom-box-header romBgHeader="${bgHeader}" romTitle="${title}">${bodyContent}</rom-box-header>`
  }) class StubComponent { }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BoxHeaderComponent,
        StubComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxHeaderComponent);
    component = fixture.componentInstance;
    nativeElem = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should initialize', () => {
    expect(component).toBeDefined();
    expect(nativeElem.getElementsByClassName(bodyClass).length).toBe(1);
    expect(nativeElem.getElementsByClassName(headerClass)[0].nodeName).toBe('H6');
    expect(nativeElem.getElementsByClassName(contentClass).length).toBe(1);
  });

  it('should compile rom-box-header', () => {
    const stubFixture: ComponentFixture<StubComponent> = TestBed.createComponent(StubComponent),
      stubNativeElem: HTMLElement = stubFixture.nativeElement;
    stubFixture.detectChanges();

    const headerElem: Element = stubNativeElem.getElementsByClassName(headerClass)[0],
      bodyElem: Element = stubNativeElem.getElementsByClassName(contentClass)[0];

    expect(headerElem.textContent).toContain(title);
    expect(headerElem.className).toContain(bgHeader);
    expect(bodyElem.textContent).toContain(bodyContent);
  });
});

