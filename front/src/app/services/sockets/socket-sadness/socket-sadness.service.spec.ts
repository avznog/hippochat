import { TestBed } from '@angular/core/testing';

import { SocketSadnessService } from './socket-sadness.service';

describe('SocketSadnessService', () => {
  let service: SocketSadnessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketSadnessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
