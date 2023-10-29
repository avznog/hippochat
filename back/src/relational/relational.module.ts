import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouplesModule } from './couples/couples.module';
import { Mate } from './mates/entities/mate.entity';
import { MatesController } from './mates/mates.controller';
import { MatesModule } from './mates/mates.module';
import { MatesService } from './mates/mates.service';
import { PublicProfileModule } from './public-profile/public-profile.module';
import { SadnessModule } from './sadness/sadness.module';
import { CouplesService } from './couples/couples.service';
import { Couple } from './couples/entities/couple.entity';
import { MinioService } from 'src/minio/minio.service';
import { ConfigService } from '@nestjs/config';
import { PublicProfileService } from './public-profile/public-profile.service';
import { PublicProfile } from './public-profile/entities/public-profile.entity';
import { CoupleGateway } from 'src/gateways/couple/couple.gateway';
import { GatewaysService } from 'src/gateways/services/gateways.service';
import { PublicProfileGateway } from 'src/gateways/public-profile/public-profile.gateway';
import { MessagesModule } from './messages/messages.module';
import { Message } from './messages/entities/message.entity';
import { BatteryGateway } from 'src/gateways/battery/battery.gateway';
import { InvitationsModule } from './invitations/invitations.module';

@Module({
  imports: [
    MatesModule, PublicProfileModule, CouplesModule, TypeOrmModule.forFeature([Mate, Couple, PublicProfile, Message]), SadnessModule, MessagesModule, InvitationsModule
  ],
  controllers: [MatesController],
  providers: [MatesService, CouplesService, MinioService, ConfigService, PublicProfileService, CoupleGateway, GatewaysService, PublicProfileGateway, BatteryGateway]
})
export class RelationalModule { }

