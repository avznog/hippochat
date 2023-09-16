import { TestBed } from '@angular/core/testing';

import { SocketMessagesService } from './socket-messages.service';

describe('SocketMessagesService', () => {
  let service: SocketMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
