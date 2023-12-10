import { TestBed } from '@angular/core/testing';

import { NoMatesService } from './no-mates.service';

describe('NoMatesService', () => {
  let service: NoMatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoMatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
