import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, } from "socket.io";
import { CouplesService } from 'src/relational/couples/couples.service';
import { Mate } from 'src/relational/mates/entities/mate.entity';
import { Sadness } from 'src/relational/sadness/entities/sadness.entity';
import { GatewaysService } from '../services/gateways.service';

@WebSocketGateway({ cors: { origin: "*"}, transports: ["polling", "websocket"]})
export class SadnessGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly couplesService: CouplesService,
    private readonly gatewaysService: GatewaysService
  ) {}

  handleConnection(client: any, ...args: any[]) {
    this.gatewaysService.connectedUsers.set(client.handshake.query.mateId, client.id)
  }

  handleDisconnect(client: any) {
    this.gatewaysService.connectedUsers.delete(client.handshake.query.mateId)
  }

  @WebSocketServer()
  server: Server

  async createMateSadness(sadness: Sadness, mate: Mate) {
    const couple = await this.couplesService.getMyCouple(mate);
    this.server.to(this.gatewaysService.connectedUsers.get(couple.mates.find(m => m.id !== mate.id).id)).emit("create-mate-sadness", sadness)
  }
}
