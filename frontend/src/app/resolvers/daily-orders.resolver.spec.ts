import { TestBed } from '@angular/core/testing';

import { DailyOrdersResolver } from './daily-orders.resolver';

describe('DailyOrdersResolver', () => {
  let resolver: DailyOrdersResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DailyOrdersResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
