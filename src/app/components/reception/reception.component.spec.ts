import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionComponent } from './reception.component';

describe('ReceptionComponent', () => {
  let component: ReceptionComponent;
  let fixture: ComponentFixture<ReceptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceptionComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
