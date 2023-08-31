import { TestBed } from '@angular/core/testing';

import { DaysEmojisService } from './days-emojis.service';

describe('DaysEmojisService', () => {
  let service: DaysEmojisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DaysEmojisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
