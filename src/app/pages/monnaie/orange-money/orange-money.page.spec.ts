import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrangeMoneyPage } from './orange-money.page';

describe('OrangeMoneyPage', () => {
  let component: OrangeMoneyPage;
  let fixture: ComponentFixture<OrangeMoneyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrangeMoneyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrangeMoneyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
