import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DaysEmojisService } from 'src/days-data/days-emojis/days-emojis.service';
import { DaysEmoji } from 'src/days-data/days-emojis/entities/days-emoji.entity';
import { DaysPicturesService } from 'src/days-data/days-pictures/days-pictures.service';
import { DaysPicture } from 'src/days-data/days-pictures/entities/days-picture.entity';
import { BatteryGateway } from 'src/gateways/battery/battery.gateway';
import { CoupleGateway } from 'src/gateways/couple/couple.gateway';
import { DaysEmojisGateway } from 'src/gateways/days-emojis/days-emojis.gateway';
import { DaysPicturesGateway } from 'src/gateways/days-pictures/days-pictures.gateway';
import { MessagesGateway } from 'src/gateways/messages/messages.gateway';
import { PublicProfileGateway } from 'src/gateways/public-profile/public-profile.gateway';
import { SadnessGateway } from 'src/gateways/sadness/sadness.gateway';
import { GatewaysService } from 'src/gateways/services/gateways.service';
import { MinioService } from 'src/minio/minio.service';
import { CouplesModule } from './couples/couples.module';
import { CouplesService } from './couples/couples.service';
import { Couple } from './couples/entities/couple.entity';
import { InvitationsModule } from './invitations/invitations.module';
import { Mate } from './mates/entities/mate.entity';
import { MatesController } from './mates/mates.controller';
import { MatesModule } from './mates/mates.module';
import { MatesService } from './mates/mates.service';
import { Message } from './messages/entities/message.entity';
import { MessagesModule } from './messages/messages.module';
import { MessagesService } from './messages/messages.service';
import { PublicProfile } from './public-profile/entities/public-profile.entity';
import { PublicProfileModule } from './public-profile/public-profile.module';
import { PublicProfileService } from './public-profile/public-profile.service';
import { Sadness } from './sadness/entities/sadness.entity';
import { SadnessModule } from './sadness/sadness.module';
import { SadnessService } from './sadness/sadness.service';
import { InvitationsService } from './invitations/invitations.service';
import { Invitation } from './invitations/entities/invitation.entity';
import { InvitationGateway } from 'src/gateways/invitation/invitation.gateway';

@Module({
  imports: [
    MatesModule, PublicProfileModule, CouplesModule, TypeOrmModule.forFeature([Mate, Couple, PublicProfile, Message, DaysEmoji, DaysPicture, Sadness, Invitation]), SadnessModule, MessagesModule, InvitationsModule
  ],
  controllers: [MatesController],
  providers: [MatesService, CouplesService, MinioService, ConfigService, PublicProfileService, CoupleGateway, GatewaysService, PublicProfileGateway, BatteryGateway, MessagesService, MessagesGateway, DaysEmojisService, DaysPicturesService, DaysEmojisGateway, DaysPicturesGateway, SadnessService, SadnessGateway, InvitationsService, InvitationGateway]
})
export class RelationalModule { }

