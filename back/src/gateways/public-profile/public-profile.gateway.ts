import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { GatewaysService } from '../services/gateways.service';

@WebSocketGateway({namespace: "sadness", cors: { origin: "*"}, transports: ["polling", "websocket"]})
export class PublicProfileGateway implements OnGatewayConnection, OnGatewayDisconnect {
  
  constructor(
    private readonly gatewaysService: GatewaysService
  ) {}

  handleConnection(client: any, ...args: any[]) {
    this.gatewaysService.connectedUsers.set(client.handshake.query.mateId, client.id)
  }

  handleDisconnect(client: any) {
    this.gatewaysService.connectedUsers.delete(client.handshake.query.mateId)
  }

  @WebSocketServer()
  server: Server;
}
