import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { DaysPicturesGateway } from 'src/gateways/days-pictures/days-pictures.gateway';
import { MinioService } from 'src/minio/minio.service';
import { Mate } from 'src/relational/mates/entities/mate.entity';
import { Between, Equal, Repository } from 'typeorm';
import { DaysPicture } from './entities/days-picture.entity';

@Injectable()
export class DaysPicturesService {

  constructor(
    @InjectRepository(DaysPicture)
    private readonly daysPicturesRepository: Repository<DaysPicture>,

    private readonly minioService: MinioService,
    private readonly daysPicturesGateway: DaysPicturesGateway
  ) { }

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
    return await this.minioService.generateUrl(dayPicture.value);
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
    const path = `/users/${mate.email}/days-pictures/original/${file.originalname.split(".")[0] + '.webp'}`;
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

  async getMyMonth(mate: Mate, date: string) {
    try {
      const daysPictures = await this.daysPicturesRepository.find({
        where: {
          mate: {
            id: mate.id
          },
          date: Between(moment(new Date(date)).tz(mate.timezone).startOf("month").format("YYYY-MM-DD"), moment(new Date(date)).tz("Europe/Paris").endOf("month").format("YYYY-MM-DD"))
        }
      });
      return await Promise.all([daysPictures.map(async daysPicture => { return { date: daysPicture.date, value: await this.minioService.generateUrl(daysPicture.value.replace("original", "80x100")) } })].map(async inner => {
        return await Promise.all(inner);
      }))
    } catch (error) {
      console.log(error)
    }
  }

  async getMatesMonth(mate: Mate, date: string) {
    try {
      const daysPictures = await this.daysPicturesRepository.find({
        where: {
          mate: {
            id: mate.id
          },
          date: Between(moment(new Date(date)).tz(mate.timezone).startOf("month").format("YYYY-MM-DD"), moment(new Date(date)).tz(mate.timezone).endOf("month").format("YYYY-MM-DD"))
        }
      });
      return await Promise.all([daysPictures.map(async daysPicture => { return { date: daysPicture.date, value: await this.minioService.generateUrl(daysPicture.value.replace("original", "80x100")) } })].map(async inner => {
        return await Promise.all(inner);
      }))
    } catch (error) {
      console.log(error)
    }
  }

  async getOnePicture(mate: Mate, date: string) {
    try {
      const dayPicture = await this.daysPicturesRepository.findOne({
        where: {
          mate: {
            id: mate.id
          },
          date: Equal(date)
        }
      });
      if (!dayPicture) return null;
      return await this.minioService.generateUrl(dayPicture.value);
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async createSomeDaysPicture(mate: Mate, file: Express.Multer.File, date: string) {
    try {
      const path = `/users/${mate.email}/days-pictures/original/${file.originalname.split(".")[0] + '.webp'}`;
      await this.minioService.uploadFile(path, file);
      const someDaysPicture = await this.daysPicturesRepository.save({
        date: date,
        mate: mate,
        value: path
      });
      this.daysPicturesGateway.updateSomeDaysPicture(mate, { ...someDaysPicture, value: await this.minioService.generateUrl(path) });
      return someDaysPicture;

    } catch (error) {
      throw new HttpException("Can't create the picture", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
