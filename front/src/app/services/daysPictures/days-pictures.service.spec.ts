import { TestBed } from '@angular/core/testing';

import { DaysPicturesService } from './days-pictures.service';

describe('DaysPicturesService', () => {
  let service: DaysPicturesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DaysPicturesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
