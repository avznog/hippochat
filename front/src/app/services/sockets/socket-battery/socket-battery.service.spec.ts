import { TestBed } from '@angular/core/testing';

import { SocketBatteryService } from './socket-battery.service';

describe('SocketBatteryService', () => {
  let service: SocketBatteryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketBatteryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
