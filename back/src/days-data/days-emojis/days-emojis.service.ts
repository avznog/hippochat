import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment-timezone';
import { Mate } from 'src/relational/mates/entities/mate.entity';
import { Equal, Repository } from 'typeorm';
import { DaysEmoji } from './entities/days-emoji.entity';
import { CouplesService } from 'src/relational/couples/couples.service';
import { CreateDaysEmojiDto } from './dto/create-days-emoji.dto';
import { DaysEmojisGateway } from 'src/gateways/days-emojis/days-emojis.gateway';

@Injectable()
export class DaysEmojisService {

  constructor(
    @InjectRepository(DaysEmoji)
    private readonly daysEmojiRepository: Repository<DaysEmoji>,

    private readonly couplesService: CouplesService,
    private readonly daysEmojisGateway: DaysEmojisGateway
  ) {}

  async getMyTodaysEmoji(mate: Mate) {
    return await this.daysEmojiRepository.findOne({
      where: {
        mate: {
          id: mate.id
        },
        date: Equal((moment(new Date()).tz(mate.timezone).format("YYYY-MM-DD")))
      }
    })
  }

  async getMatesTodaysEmoji(mate: Mate) {
    const m = await this.couplesService.getMyMate(mate);
    return await this.daysEmojiRepository.findOne({
      where: {
        mate: {
          id: m.id
        },
        date: Equal((moment(new Date()).tz(m.timezone).format("YYYY-MM-DD")))
      }
    })
  }

  async createToday(createDaysEmojiDto: CreateDaysEmojiDto) {
    const dayEmoji = await this.daysEmojiRepository.save(createDaysEmojiDto);
    this.daysEmojisGateway.updateTodaysDayEmoji(createDaysEmojiDto.mate, dayEmoji);
    return dayEmoji;
  }
}
