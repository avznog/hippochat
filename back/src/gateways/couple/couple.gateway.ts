import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from "socket.io";
import { Couple } from 'src/relational/couples/entities/couple.entity';
import { Mate } from 'src/relational/mates/entities/mate.entity';
import { GatewaysService } from '../services/gateways.service';

@WebSocketGateway({namespace: "couple", cors: { origin: "*"}, transports: ["polling", "websocket"]})
export class CoupleGateway implements OnGatewayConnection, OnGatewayDisconnect {
  
  constructor(
    private readonly gatewaysService: GatewaysService
  ) {}

  handleConnection(client: any, ...args: any[]) {
    console.log("connected")
    this.gatewaysService.connectedUsers.set(client.handshake.query.mateId, client.id)
  }

  handleDisconnect(client: any) {
    this.gatewaysService.connectedUsers.delete(client.handshake.query.mateId)
  }

  @WebSocketServer()
  server: Server;

  updateMyCouple(mate: Mate, couple: Couple) {
    this.server.to(this.gatewaysService.connectedUsers.get(couple.mates.find(m => m.id !== mate.id).id)).emit("update-couple", couple);
  }
}
