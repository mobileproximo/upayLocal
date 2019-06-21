import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrangePage } from './orange.page';

describe('OrangePage', () => {
  let component: OrangePage;
  let fixture: ComponentFixture<OrangePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrangePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrangePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
