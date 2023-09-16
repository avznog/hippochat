import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Mate } from 'src/relational/mates/entities/mate.entity';
import { Message } from 'src/relational/messages/entities/message.entity';
import { GatewaysService } from '../services/gateways.service';

@WebSocketGateway({ namespace: "messages", cors: { origin: "*" }, transports: ["polling", "websocket"] })
export class MessagesGateway {

  constructor(
    private readonly gatewaysService: GatewaysService,
  ) { }

  handleConnection(client: any, ...args: any[]) {
    this.gatewaysService.connectedUsers.set(client.handshake.query.mateId, client.id)
  }

  handleDisconnect(client: any) {
    this.gatewaysService.connectedUsers.delete(client.handshake.query.mateId)
  }

  @WebSocketServer()
  server: Server;

  async sendMessage(mate: Mate, message: Message) {
    this.server.to(this.gatewaysService.connectedUsers.get(mate.couple.mates.find(m => m.id !== mate.id).id)).emit("send", message);
  }
}
