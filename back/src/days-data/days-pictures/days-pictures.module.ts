import { Module } from '@nestjs/common';
import { DaysPicturesService } from './days-pictures.service';
import { DaysPicturesController } from './days-pictures.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DaysPicture } from './entities/days-picture.entity';
import { Mate } from 'src/relational/mates/entities/mate.entity';
import { MinioService } from 'src/minio/minio.service';
import { ConfigService } from '@nestjs/config';
import { DaysPicturesGateway } from 'src/gateways/days-pictures/days-pictures.gateway';
import { GatewaysService } from 'src/gateways/services/gateways.service';

@Module({
  imports: [TypeOrmModule.forFeature([DaysPicture, Mate])],
  controllers: [DaysPicturesController],
  providers: [DaysPicturesService, MinioService, ConfigService, DaysPicturesGateway, GatewaysService]
})
export class DaysPicturesModule {}
