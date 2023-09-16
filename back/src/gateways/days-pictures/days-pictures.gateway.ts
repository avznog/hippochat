import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { DaysPicture } from 'src/days-data/days-pictures/entities/days-picture.entity';
import { Mate } from 'src/relational/mates/entities/mate.entity';
import { GatewaysService } from '../services/gateways.service';

@WebSocketGateway({ namespace: "days-pictures", cors: { origin: "*" }, transports: ["polling", "websocket"] })
export class DaysPicturesGateway {

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

  async updateMyTodaysPicture(mate: Mate, todaysPicture: DaysPicture) {
    this.server.to(this.gatewaysService.connectedUsers.get(mate.couple.mates.find(m => m.id !== mate.id).id)).emit("update-my-todays-picture", todaysPicture);
  }
}
