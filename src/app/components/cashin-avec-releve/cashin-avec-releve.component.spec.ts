import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashinAvecReleveComponent } from './cashin-avec-releve.component';

describe('CashinAvecReleveComponent', () => {
  let component: CashinAvecReleveComponent;
  let fixture: ComponentFixture<CashinAvecReleveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashinAvecReleveComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashinAvecReleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
