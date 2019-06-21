import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YakalmaPage } from './yakalma.page';

describe('YakalmaPage', () => {
  let component: YakalmaPage;
  let fixture: ComponentFixture<YakalmaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YakalmaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YakalmaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
