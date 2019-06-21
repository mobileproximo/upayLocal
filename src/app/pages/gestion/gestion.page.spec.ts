import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPage } from './gestion.page';

describe('GestionPage', () => {
  let component: GestionPage;
  let fixture: ComponentFixture<GestionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
