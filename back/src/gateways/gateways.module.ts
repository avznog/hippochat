import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouplesService } from 'src/relational/couples/couples.service';
import { Couple } from 'src/relational/couples/entities/couple.entity';
import { Mate } from 'src/relational/mates/entities/mate.entity';
import { CoupleGateway } from './couple/couple.gateway';
import { DaysEmojisGateway } from './days-emojis/days-emojis.gateway';
import { DaysPicturesGateway } from './days-pictures/days-pictures.gateway';
import { MessagesGateway } from './messages/messages.gateway';
import { PublicProfileGateway } from './public-profile/public-profile.gateway';
import { SadnessGateway } from './sadness/sadness.gateway';
import { GatewaysService } from './services/gateways.service';
import { BatteryGateway } from './battery/battery.gateway';
import { InvitationGateway } from './invitation/invitation.gateway';
@Module({
  imports: [TypeOrmModule.forFeature([Couple, Mate])],
  providers: [SadnessGateway, CouplesService, GatewaysService, PublicProfileGateway, CoupleGateway, DaysEmojisGateway, DaysPicturesGateway, MessagesGateway, BatteryGateway, InvitationGateway]
})
export class GatewaysModule { }
