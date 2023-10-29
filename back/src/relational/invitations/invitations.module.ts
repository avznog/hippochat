import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouplesService } from '../couples/couples.service';
import { Invitation } from './entities/invitation.entity';
import { InvitationsController } from './invitations.controller';
import { InvitationsService } from './invitations.service';
import { Couple } from '../couples/entities/couple.entity';
import { Mate } from '../mates/entities/mate.entity';
import { CoupleGateway } from 'src/gateways/couple/couple.gateway';
import { GatewaysService } from 'src/gateways/services/gateways.service';

@Module({
  imports: [TypeOrmModule.forFeature([Invitation, Couple, Mate])],
  controllers: [InvitationsController],
  providers: [InvitationsService, CouplesService, CoupleGateway, GatewaysService]
})
export class InvitationsModule { }
