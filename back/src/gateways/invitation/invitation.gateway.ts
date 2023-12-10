import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { GatewaysService } from '../services/gateways.service';
import { Invitation } from 'src/relational/invitations/entities/invitation.entity';

@WebSocketGateway({ namespace: "invitation", cors: { origin: "*" }, transports: ["polling", "websocket"] })
export class InvitationGateway {

  constructor(
    private readonly gatewaysService: GatewaysService
  ) { }

  handleDisconnect(client: any) {
    this.gatewaysService.connectedUsers.delete(client.handshake.query.mateId);
  }

  handleConnection(client: any, ...args: any[]) {
    this.gatewaysService.connectedUsers.set(client.handshake.query.mateId, client.id);
  }

  shareCreatedInvitation(invitation: Invitation) {
    this.server.to(this.gatewaysService.connectedUsers.get(invitation.receiver.id)).emit("new-invitation", invitation);
  }

  shareDeniedInvitation(invitation: Invitation) {
    this.server.to(this.gatewaysService.connectedUsers.get(invitation.asker.id)).emit("denied-invitation", invitation);
  }

  shareAcceptedInvitation(invitation: Invitation) {
    this.server.to(this.gatewaysService.connectedUsers.get(invitation.asker.id)).emit("accepted-invitation", invitation);
  }

  @WebSocketServer()
  server: Server;
}
