import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IziPage } from './izi.page';

describe('IziPage', () => {
  let component: IziPage;
  let fixture: ComponentFixture<IziPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IziPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IziPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
