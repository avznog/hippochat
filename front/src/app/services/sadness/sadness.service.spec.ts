import { TestBed } from '@angular/core/testing';

import { SadnessService } from './sadness.service';

describe('SadnessService', () => {
  let service: SadnessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SadnessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
