import { TestBed } from '@angular/core/testing';

import { BetPoolService } from './bet-pool.service';

describe('BetPoolService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BetPoolService = TestBed.get(BetPoolService);
    expect(service).toBeTruthy();
  });
});
