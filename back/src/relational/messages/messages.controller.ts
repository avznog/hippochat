import { Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorators/current-user.model';
import JwtAuthGuard from 'src/auth/guards/jwt-auth.guard';
import { Mate } from '../mates/entities/mate.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';

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

  @Post("create-private-picture")
  @UseInterceptors(FileInterceptor("file"))
  createPrivatePicture(@UploadedFile() file: Express.Multer.File, @CurrentUser() mate: Mate) {
    return this.messagesService.createPrivatePicture(mate, file);
  }

  @Get("get-private-picture/:messageId")
  async getPrivatePicture(@Param("messageId") messageId: string) {
    return JSON.stringify(await this.messagesService.getPrivatePicture(messageId));
  }

  @Get("destroy-private-picture/:id")
  destroyPrivatePicture(@Param("id") id: string) {
    return this.messagesService.destroyPrivatePicture(id);
  }

}
