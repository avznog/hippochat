import { Module } from '@nestjs/common';
import { DaysEmojisService } from './days-emojis.service';
import { DaysEmojisController } from './days-emojis.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mate } from 'src/relational/mates/entities/mate.entity';
import { DaysEmoji } from './entities/days-emoji.entity';
import { CouplesService } from 'src/relational/couples/couples.service';
import { Couple } from 'src/relational/couples/entities/couple.entity';
import { CoupleGateway } from 'src/gateways/couple/couple.gateway';
import { GatewaysService } from 'src/gateways/services/gateways.service';
import { DaysEmojisGateway } from 'src/gateways/days-emojis/days-emojis.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Mate, DaysEmoji, Couple])],
  controllers: [DaysEmojisController],
  providers: [DaysEmojisService, CouplesService, CoupleGateway, GatewaysService, DaysEmojisGateway]
})
export class DaysEmojisModule {}
