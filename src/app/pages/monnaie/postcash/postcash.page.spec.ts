import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostcashPage } from './postcash.page';

describe('PostcashPage', () => {
  let component: PostcashPage;
  let fixture: ComponentFixture<PostcashPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostcashPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostcashPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
