import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodepinComponent } from './codepin.component';

describe('CodepinComponent', () => {
  let component: CodepinComponent;
  let fixture: ComponentFixture<CodepinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodepinComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodepinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
