import { TestBed } from '@angular/core/testing';

import { DailyIncomeResolver } from './daily-income.resolver';

describe('DailyIncomeResolver', () => {
  let resolver: DailyIncomeResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DailyIncomeResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
