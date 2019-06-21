import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SenelecPage } from './senelec.page';

describe('SenelecPage', () => {
  let component: SenelecPage;
  let fixture: ComponentFixture<SenelecPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SenelecPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SenelecPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
