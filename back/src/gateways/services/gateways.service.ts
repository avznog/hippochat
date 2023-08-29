import { Injectable } from '@nestjs/common';

@Injectable()
export class GatewaysService {
  connectedUsers = new Map<string, string>();

  constructor() {}

}
