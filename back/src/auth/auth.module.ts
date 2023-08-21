import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mate } from 'src/relational/mates/entities/mate.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { JwtRefreshTokenStrategy } from './jwt-refresh-token.strategy';
import { MatesService } from 'src/relational/mates/mates.service';
import { PublicProfile } from 'src/relational/public-profile/entities/public-profile.entity';
import { CouplesService } from 'src/relational/couples/couples.service';
import { Couple } from 'src/relational/couples/entities/couple.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mate, PublicProfile, Couple]),
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
    CouplesService
  ]
})
export class AuthModule {}
