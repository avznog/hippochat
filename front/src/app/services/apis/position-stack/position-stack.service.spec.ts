import { TestBed } from '@angular/core/testing';

import { PositionStackService } from './position-stack.service';

describe('PositionStackService', () => {
  let service: PositionStackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PositionStackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
