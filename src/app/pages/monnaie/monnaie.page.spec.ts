import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonnaiePage } from './monnaie.page';

describe('MonnaiePage', () => {
  let component: MonnaiePage;
  let fixture: ComponentFixture<MonnaiePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonnaiePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonnaiePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
