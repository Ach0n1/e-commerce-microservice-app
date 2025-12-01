import { TestBed } from '@angular/core/testing';

import { ItemsSoldByCategoryResolver } from './items-sold-by-category.resolver';

describe('ItemsSoldByCategoryResolver', () => {
  let resolver: ItemsSoldByCategoryResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ItemsSoldByCategoryResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
