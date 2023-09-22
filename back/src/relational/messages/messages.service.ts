import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessagesGateway } from 'src/gateways/messages/messages.gateway';
import { MinioService } from 'src/minio/minio.service';
import { LessThan, Repository } from 'typeorm';
import { Mate } from '../mates/entities/mate.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,

    private readonly messagesGateway: MessagesGateway,
    private readonly minioService: MinioService
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

  async createPrivatePicture(mate: Mate, file: Express.Multer.File) {
    const path = `/users/${mate.email}/private-pictures/original/${file.originalname.split(".")[0] + '.webp'}`;
    await this.minioService.uploadFile(path, file);
    const message = await this.messageRepository.save({
      couple: mate.couple,
      mate: mate,
      date: new Date(),
      privatePicture: path,
      value: ""
    });
    this.messagesGateway.sendMessage(mate, message);
    return message;
  }

  async getPrivatePicture(messageId: string) {
    const message = await this.messageRepository.findOne({ where: { id: messageId } });
    return this.minioService.generateUrl(message.privatePicture);
  }

  async destroyPrivatePicture(id: string) {
    const message = await this.messageRepository.findOne({ where: { id: id } });
    await this.messageRepository.update(id, { privatePictureOpened: true });
    return this.minioService.destroyFile(message.privatePicture)
  }
}
