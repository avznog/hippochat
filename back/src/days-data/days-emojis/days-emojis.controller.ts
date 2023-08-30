import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { DaysEmojisService } from './days-emojis.service';
import { ApiTags } from '@nestjs/swagger';
import JwtAuthGuard from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.model';
import { Mate } from 'src/relational/mates/entities/mate.entity';
import { CreateDaysEmojiDto } from './dto/create-days-emoji.dto';

@Controller('days-emojis')
@ApiTags("days-emojis")
@UseGuards(JwtAuthGuard)
export class DaysEmojisController {
  constructor(private readonly daysEmojisService: DaysEmojisService) {}

  @Get("my-todays-emoji")
  myTodaysEmoji(@CurrentUser() mate: Mate) {
    return this.daysEmojisService.getMyTodaysEmoji(mate);
  }

  @Get("mate-todays-emoji")
  getMateTodaysEmoji(@CurrentUser() mate: Mate) {
    return this.daysEmojisService.getMatesTodaysEmoji(mate);
  }

  @Post("create-today")
  createToday(@CurrentUser() mate: Mate, @Body() createDaysEmojiDto: CreateDaysEmojiDto) {
    createDaysEmojiDto.mate = mate;
    return this.daysEmojisService.createToday(createDaysEmojiDto);
  }
}
  