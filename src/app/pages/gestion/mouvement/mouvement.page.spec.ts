import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MouvementPage } from './mouvement.page';

describe('MouvementPage', () => {
  let component: MouvementPage;
  let fixture: ComponentFixture<MouvementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MouvementPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MouvementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
