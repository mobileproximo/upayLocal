import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuRechargeComponent } from './recu-recharge.component';

describe('RecuRechargeComponent', () => {
  let component: RecuRechargeComponent;
  let fixture: ComponentFixture<RecuRechargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecuRechargeComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuRechargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
