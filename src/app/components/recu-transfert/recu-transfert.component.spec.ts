import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuTransfertComponent } from './recu-transfert.component';

describe('RecuTransfertComponent', () => {
  let component: RecuTransfertComponent;
  let fixture: ComponentFixture<RecuTransfertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecuTransfertComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuTransfertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
