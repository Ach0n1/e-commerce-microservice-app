import { TestBed } from '@angular/core/testing';

import { ItemsSoldCounterResolver } from './items-sold-counter.resolver';

describe('ItemsSoldCounterResolver', () => {
  let resolver: ItemsSoldCounterResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ItemsSoldCounterResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
