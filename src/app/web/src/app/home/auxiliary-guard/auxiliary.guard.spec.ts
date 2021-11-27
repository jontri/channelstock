import { TestBed, async, inject } from '@angular/core/testing';

import { AuxiliaryGuard } from './auxiliary.guard';

describe('AuxiliaryGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuxiliaryGuard]
    });
  });

  it('should ...', inject([AuxiliaryGuard], (guard: AuxiliaryGuard) => {
    expect(guard).toBeTruthy();
  }));
});
