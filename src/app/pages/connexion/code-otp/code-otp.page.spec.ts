import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeOTPPage } from './code-otp.page';

describe('CodeOTPPage', () => {
  let component: CodeOTPPage;
  let fixture: ComponentFixture<CodeOTPPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeOTPPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeOTPPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
