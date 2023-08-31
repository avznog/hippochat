import { TestBed } from '@angular/core/testing';

import { SocketDaysEmojisService } from './socket-days-emojis.service';

describe('SocketDaysEmojisService', () => {
  let service: SocketDaysEmojisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketDaysEmojisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
