import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import JwtAuthGuard from 'src/auth/guards/jwt-auth.guard';
import { MessagesService } from './messages.service';
import { CurrentUser } from 'src/auth/decorators/current-user.model';
import { Mate } from '../mates/entities/mate.entity';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('messages')
@ApiTags("messages")
@UseGuards(JwtAuthGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) { }

  @Post("create")
  create(@CurrentUser() mate: Mate, @Body() createMessageDto: CreateMessageDto) {
    createMessageDto.mate = mate;
    return this.messagesService.create(createMessageDto);
  }

  @Get("load/:date")
  load(@CurrentUser() mate: Mate, @Param("date") date: string) {
    return this.messagesService.load(mate, date === 'false' ? false : date);
  }

}
