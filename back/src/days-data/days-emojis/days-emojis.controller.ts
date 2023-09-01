import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorators/current-user.model';
import JwtAuthGuard from 'src/auth/guards/jwt-auth.guard';
import { Mate } from 'src/relational/mates/entities/mate.entity';
import { DaysEmojisService } from './days-emojis.service';
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
  
  @Get("all-my-monthly")
  getMyAllMonthly(@CurrentUser() mate: Mate, @Query() data: {date: string}) {
    console.log(data)
    return this.daysEmojisService.getMyAllMonthly(mate, new Date(data.date));
  }
}
  