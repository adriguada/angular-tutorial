import { TestBed } from '@angular/core/testing';

import { Lending } from './lending';

describe('Lending', () => {
  let service: Lending;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Lending);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
