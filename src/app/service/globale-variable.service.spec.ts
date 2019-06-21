import { TestBed } from '@angular/core/testing';

import { GlobaleVariableService } from './globale-variable.service';

describe('GlobaleVariableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlobaleVariableService = TestBed.get(GlobaleVariableService);
    expect(service).toBeTruthy();
  });
});
