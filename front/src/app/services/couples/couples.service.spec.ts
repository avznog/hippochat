import { TestBed } from '@angular/core/testing';

import { CouplesService } from './couples.service';

describe('CouplesService', () => {
  let service: CouplesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CouplesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
