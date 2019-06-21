import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmoneyPage } from './emoney.page';

describe('EmoneyPage', () => {
  let component: EmoneyPage;
  let fixture: ComponentFixture<EmoneyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmoneyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmoneyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
