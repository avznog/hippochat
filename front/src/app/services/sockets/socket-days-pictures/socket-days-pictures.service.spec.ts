import { TestBed } from '@angular/core/testing';

import { SocketDaysPicturesService } from './socket-days-pictures.service';

describe('SocketDaysPicturesService', () => {
  let service: SocketDaysPicturesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketDaysPicturesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
