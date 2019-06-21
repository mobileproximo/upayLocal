import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuEncaissementComponent } from './recu-encaissement.component';

describe('RecuEncaissementComponent', () => {
  let component: RecuEncaissementComponent;
  let fixture: ComponentFixture<RecuEncaissementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecuEncaissementComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuEncaissementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
