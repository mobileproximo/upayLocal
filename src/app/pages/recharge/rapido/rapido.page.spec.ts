import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RapidoPage } from './rapido.page';

describe('RapidoPage', () => {
  let component: RapidoPage;
  let fixture: ComponentFixture<RapidoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RapidoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RapidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
