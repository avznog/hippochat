import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment-timezone';
import { DaysEmojisGateway } from 'src/gateways/days-emojis/days-emojis.gateway';
import { CouplesService } from 'src/relational/couples/couples.service';
import { Mate } from 'src/relational/mates/entities/mate.entity';
import { Between, Equal, Repository } from 'typeorm';
import { CreateDaysEmojiDto } from './dto/create-days-emoji.dto';
import { DaysEmoji } from './entities/days-emoji.entity';

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

  async getMyAllMonthly(mate: Mate, date: Date) {
    return await this.daysEmojiRepository.find({
      where: {
        mate: {
          id: mate.id
        },
        date: Between(moment(date).tz(mate.timezone).startOf("month").format("YYYY-MM-DD"), moment(date).tz(mate.timezone).endOf("month").format("YYYY-MM-DD"))
      }
    })
  }

  async getMatesAllMonthly(mate: Mate, date: Date) {
    const mymate = mate.couple.mates.find(m => m.id !== mate.id);
    return await this.daysEmojiRepository.find({
      where: {
        mate: {
          id: mymate.id
        },
        date: Between(moment(date).tz(mymate.timezone).startOf("month").format("YYYY-MM-DD"), moment(date).tz(mymate.timezone).endOf("month").format("YYYY-MM-DD"))
      }
    })
  }
}
