import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesGateway } from 'src/gateways/messages/messages.gateway';
import { GatewaysService } from 'src/gateways/services/gateways.service';
import { MinioService } from 'src/minio/minio.service';
import { Message } from './entities/message.entity';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  controllers: [MessagesController],
  providers: [MessagesService, MessagesGateway, GatewaysService, MinioService, ConfigService]
})
export class MessagesModule { }
