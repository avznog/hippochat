import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { DaysPicturesGateway } from 'src/gateways/days-pictures/days-pictures.gateway';
import { MinioService } from 'src/minio/minio.service';
import { Mate } from 'src/relational/mates/entities/mate.entity';
import { Equal, Repository } from 'typeorm';
import { DaysPicture } from './entities/days-picture.entity';

@Injectable()
export class DaysPicturesService {
  
  constructor(
    @InjectRepository(DaysPicture)
    private readonly daysPicturesRepository: Repository<DaysPicture>,

    private readonly minioService: MinioService,
    private readonly daysPicturesGateway: DaysPicturesGateway
  ) {}

  async getTodayDaysPicture(mate: Mate) {
    const dayPicture = await this.daysPicturesRepository.findOne({
      where: {
        mate: {
          id: mate.id
        },
        date: Equal(moment(new Date()).tz(mate.timezone).format("YYYY-MM-DD"))
      }
    });
    if (!dayPicture) return null
    return await this.minioService.getFile(dayPicture.value);
  }

  async createTodayDayPicture(mate: Mate, file: Express.Multer.File) {
    if (await this.daysPicturesRepository.findOne({
      where: {
        mate: {
          id: mate.id
        },
        date: Equal(moment(new Date()).tz(mate.timezone).format("YYYY-MM-DD"))
      }
    })) {
      return new HttpException("Vous avez déjà pris une photo aujourd'hui", HttpStatus.AMBIGUOUS)
    }
    const path = `/users/${mate.email}/days-pictures/${file.originalname}`;
    await this.minioService.uploadFile(path, file);
    const todayDayPicture = await this.daysPicturesRepository.save({
      date: moment(new Date()).tz(mate.timezone).format("YYYY-MM-DD"),
      mate: mate,
      value: path
    });
    this.daysPicturesGateway.updateMyTodaysPicture(mate, todayDayPicture);
    return todayDayPicture;
  }

  async getMyTodaysPicture(mate: Mate) {
    return await this.daysPicturesRepository.findOne({
      where: {
        mate: {
          id: mate.id
        },
        date: Equal(moment(new Date()).tz(mate.timezone).format("YYYY-MM-DD"))
      }
    })
  }

  async getMyMatesTodaysPicture(mate: Mate) {
    return await this.daysPicturesRepository.findOne({
      where: {
        mate: {
          id: mate.couple.mates.find(m => m.id !== mate.id).id
        },
        date: Equal(moment(new Date()).tz(mate.timezone).format("YYYY-MM-DD"))
      }
    })
  }

  async getMyForDate(mate: Mate, date: string) {
    const dayPicture = await this.daysPicturesRepository.findOne({
      where: {
        mate: {
          id: mate.id
        },
        date: Equal(moment(new Date(date)).tz(mate.timezone).format("YYYY-MM-DD"))
      }
    });
    if (!dayPicture) return null
    return await this.minioService.getFile(dayPicture.value);
  }

  async getMyMatesForDate(mate: Mate, date: string) {

    const dayPicture = await this.daysPicturesRepository.findOne({
      where: {
        mate: {
          id: mate.couple.mates.find(m => m.id !== mate.id).id
        },
        date: Equal(moment(new Date(date)).tz(mate.timezone).format("YYYY-MM-DD"))
      }
    });
    if (!dayPicture) return null
    return await this.minioService.getFile(dayPicture.value);
  }
}
