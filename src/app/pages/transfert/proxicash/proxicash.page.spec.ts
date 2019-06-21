import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProxicashPage } from './proxicash.page';

describe('ProxicashPage', () => {
  let component: ProxicashPage;
  let fixture: ComponentFixture<ProxicashPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProxicashPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProxicashPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
