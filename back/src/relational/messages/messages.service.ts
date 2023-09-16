import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessagesGateway } from 'src/gateways/messages/messages.gateway';
import { LessThan, Repository } from 'typeorm';
import { Mate } from '../mates/entities/mate.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,

    private readonly messagesGateway: MessagesGateway
  ) { }

  async create(createMessageDto: CreateMessageDto) {
    const message = await this.messageRepository.save({
      ...createMessageDto,
      couple: createMessageDto.mate.couple,
      date: new Date()
    });
    this.messagesGateway.sendMessage(createMessageDto.mate, message);
    return message;
  }

  async load(mate: Mate, date: string | false) {
    return await this.messageRepository.find({
      where: {
        couple: {
          id: mate.couple.id
        },
        date: LessThan(new Date(date ? new Date(date).toUTCString() : new Date().toUTCString()))
      },
      order: {
        date: "desc"
      },
      take: 20,
      relations: ["mate", "couple", "mate.publicProfile"]
    })
  }
}
