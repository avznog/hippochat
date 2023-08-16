import { TestBed } from '@angular/core/testing';

import { MatesService } from './mates.service';

describe('MatesService', () => {
  let service: MatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
