import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuWoyofalComponent } from './recu-woyofal.component';

describe('RecuWoyofalComponent', () => {
  let component: RecuWoyofalComponent;
  let fixture: ComponentFixture<RecuWoyofalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecuWoyofalComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuWoyofalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
