import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from "socket.io";
import { Mate } from 'src/relational/mates/entities/mate.entity';
import { GatewaysService } from '../services/gateways.service';

@WebSocketGateway({ namespace: "battery", cors: { origin: "*" }, transports: ["polling", "websocket"] })
export class BatteryGateway implements OnGatewayConnection, OnGatewayDisconnect {

  constructor(
    private readonly gatewaysService: GatewaysService
  ) {
  }
  batteryInterval: any;

  handleConnection(client: any, ...args: any[]) {
    this.gatewaysService.connectedUsers.set(client.handshake.query.mateId, client.id)
    this.checkBattery(client.id);
  }

  checkBattery(id: string) {
    this.server.to(id).emit("ask-battery");
    this.batteryInterval = setInterval(() => {
      // ask battery to user
      this.server.to(id).emit("ask-battery");

      // user returns battery leevel

      // update battery level to mate
    }, 60000);

  }

  handleDisconnect(client: any) {
    clearInterval(this.batteryInterval);
    this.gatewaysService.connectedUsers.delete(client.handshake.query.mateId)
  }

  emitNewBatteryLevel(mate: Mate, batteryLevel: number) {
    try {
      this.server.to(this.gatewaysService.connectedUsers.get(mate.couple.mates.find(m => m.id !== mate.id).id)).emit("new-battery-level", batteryLevel);
    } catch (error) {
      console.log(error)
    }
  }

  @WebSocketServer()
  server: Server;
}
