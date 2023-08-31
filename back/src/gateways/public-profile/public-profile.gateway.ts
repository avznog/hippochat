import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CouplesService } from 'src/relational/couples/couples.service';
import { Mate } from 'src/relational/mates/entities/mate.entity';
import { PublicProfile } from 'src/relational/public-profile/entities/public-profile.entity';
import { GatewaysService } from '../services/gateways.service';

@WebSocketGateway({namespace: "public-profile", cors: { origin: "*"}, transports: ["polling", "websocket"]})
export class PublicProfileGateway implements OnGatewayConnection, OnGatewayDisconnect {
  
  constructor(
    private readonly gatewaysService: GatewaysService,
    private readonly couplesService: CouplesService
  ) {}

  handleConnection(client: any, ...args: any[]) {
    this.gatewaysService.connectedUsers.set(client.handshake.query.mateId, client.id)
  }

  handleDisconnect(client: any) {
    this.gatewaysService.connectedUsers.delete(client.handshake.query.mateId)
  }

  @WebSocketServer()
  server: Server;

  async updateMatePublicProfile(mate: Mate, publicProfile: PublicProfile) {
    this.server.to(this.gatewaysService.connectedUsers.get((await this.couplesService.getMyMate(mate)).id)).emit("update-mate-public-profile", publicProfile);
  }

  async updateMyPublicProfile(mate: Mate, publicProfile: PublicProfile) {
    this.server.to(this.gatewaysService.connectedUsers.get((await this.couplesService.getMyMate(mate)).id)).emit("update-my-public-profile", publicProfile);
  } 

  async updateMyProfilePicture(mate: Mate) {
    this.server.to(this.gatewaysService.connectedUsers.get((await this.couplesService.getMyMate(mate)).id)).emit("update-profile-picture");
  }
}
