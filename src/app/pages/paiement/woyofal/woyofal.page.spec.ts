import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WoyofalPage } from './woyofal.page';

describe('WoyofalPage', () => {
  let component: WoyofalPage;
  let fixture: ComponentFixture<WoyofalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WoyofalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WoyofalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
