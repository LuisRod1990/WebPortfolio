import { TestBed } from '@angular/core/testing';

import { LayoutData } from './layout-data';

describe('LayoutData', () => {
  let service: LayoutData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LayoutData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
