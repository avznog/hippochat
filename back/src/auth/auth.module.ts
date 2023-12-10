import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
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
import { CouplesService } from 'src/relational/couples/couples.service';
import { Couple } from 'src/relational/couples/entities/couple.entity';
import { Mate } from 'src/relational/mates/entities/mate.entity';
import { MatesService } from 'src/relational/mates/mates.service';
import { Message } from 'src/relational/messages/entities/message.entity';
import { MessagesService } from 'src/relational/messages/messages.service';
import { PublicProfile } from 'src/relational/public-profile/entities/public-profile.entity';
import { PublicProfileService } from 'src/relational/public-profile/public-profile.service';
import { Sadness } from 'src/relational/sadness/entities/sadness.entity';
import { SadnessService } from 'src/relational/sadness/sadness.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtRefreshTokenStrategy } from './jwt-refresh-token.strategy';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { InvitationsService } from 'src/relational/invitations/invitations.service';
import { Invitation } from 'src/relational/invitations/entities/invitation.entity';
import { InvitationGateway } from 'src/gateways/invitation/invitation.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mate, PublicProfile, Couple, PublicProfile, Message, DaysEmoji, DaysPicture, Sadness, Invitation]),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
        signOptions: {
          expiresIn: `${process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME}s`
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshTokenStrategy,
    MatesService,
    CouplesService,
    MinioService,
    ConfigService,
    PublicProfileService,
    CoupleGateway,
    GatewaysService,
    PublicProfileGateway,
    BatteryGateway,
    MessagesService,
    MessagesGateway,
    DaysEmojisService,
    DaysPicturesService,
    DaysEmojisGateway,
    DaysPicturesGateway,
    SadnessService,
    SadnessGateway,
    InvitationsService,
    InvitationGateway
  ]
})
export class AuthModule { }
