import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TigocashPage } from './tigocash.page';

describe('TigocashPage', () => {
  let component: TigocashPage;
  let fixture: ComponentFixture<TigocashPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TigocashPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TigocashPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
