import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvoiComponent } from './envoi.component';

describe('EnvoiComponent', () => {
  let component: EnvoiComponent;
  let fixture: ComponentFixture<EnvoiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvoiComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
