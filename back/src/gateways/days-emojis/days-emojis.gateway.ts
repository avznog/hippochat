import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Mate } from 'src/relational/mates/entities/mate.entity';
import { GatewaysService } from '../services/gateways.service';
import { CouplesService } from 'src/relational/couples/couples.service';
import { DaysEmoji } from 'src/days-data/days-emojis/entities/days-emoji.entity';

@WebSocketGateway({namespace: "days-emojis", cors: { origin: "*"}, transports: ["polling", "websocket"]})
export class DaysEmojisGateway {

  constructor(
    private readonly gatewaysService: GatewaysService,
    private readonly couplesService: CouplesService
  ) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client: any, ...args: any[]) {
    this.gatewaysService.connectedUsers.set(client.handshake.query.mateId, client.id)
  }

  handleDisconnect(client: any) {
    this.gatewaysService.connectedUsers.delete(client.handshake.query.mateId)
  }

  async updateTodaysDayEmoji(mate: Mate, dayEmoji: DaysEmoji) {
    this.server.to(this.gatewaysService.connectedUsers.get((await this.couplesService.getMyMate(mate)).id)).emit("update-day-emoji", dayEmoji);
  }
}
