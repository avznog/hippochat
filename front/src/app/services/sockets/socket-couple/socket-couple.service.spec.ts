import { TestBed } from '@angular/core/testing';

import { SocketCoupleService } from './socket-couple.service';

describe('SocketCoupleService', () => {
  let service: SocketCoupleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketCoupleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
