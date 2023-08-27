import { TestBed } from '@angular/core/testing';

import { SocketPublicProfileService } from './socket-public-profile.service';

describe('SocketPublicProfileService', () => {
  let service: SocketPublicProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketPublicProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
