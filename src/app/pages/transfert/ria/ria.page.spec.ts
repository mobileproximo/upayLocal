import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiaPage } from './ria.page';

describe('RiaPage', () => {
  let component: RiaPage;
  let fixture: ComponentFixture<RiaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
