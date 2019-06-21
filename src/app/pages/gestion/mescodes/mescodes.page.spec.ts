import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MescodesPage } from './mescodes.page';

describe('MescodesPage', () => {
  let component: MescodesPage;
  let fixture: ComponentFixture<MescodesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MescodesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MescodesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
