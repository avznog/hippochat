import { Controller, Get, HttpException, HttpStatus, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorators/current-user.model';
import JwtAuthGuard from 'src/auth/guards/jwt-auth.guard';
import { Mate } from 'src/relational/mates/entities/mate.entity';
import { DaysPicturesService } from './days-pictures.service';

@Controller('days-pictures')
@ApiTags("days-pictures")
@UseGuards(JwtAuthGuard)
export class DaysPicturesController {
  constructor(
    private readonly daysPicturesService: DaysPicturesService,
    ) {}

  @Get("get-my-mates-today")
  async getMyMatesToday(@CurrentUser() mate: Mate) {
    try {
      const url = await this.daysPicturesService.getTodayDaysPicture(mate.couple.mates.find(m => m.id !== mate.id));
      if(!url)
        return null;
      else
        return JSON.stringify(url);
    } catch (error) {
      console.log(error)
      throw new HttpException("No file found", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get("get-my-today")
  async getMyToday(@CurrentUser() mate: Mate) {
    try {
      const url = await this.daysPicturesService.getTodayDaysPicture(mate);
      if(!url)
        return null;
      else
        return JSON.stringify(url);
    } catch (error) {
      console.log(error);
      throw new HttpException("No file found", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get("get-my-todays-picture")
  getMyTodaysPicture(@CurrentUser() mate: Mate) {
    return this.daysPicturesService.getMyTodaysPicture(mate);
  }

  @Get("get-mates-todays-picture")
  getMyMatesTodaysPicture(@CurrentUser() mate: Mate) {
    return this.daysPicturesService.getMyMatesTodaysPicture(mate);
  }

  @Post("create-today")
  @UseInterceptors(FileInterceptor("file"))
  async createTodayDayPicture(@CurrentUser() mate: Mate, @UploadedFile() file: Express.Multer.File) {
    return await this.daysPicturesService.createTodayDayPicture(mate, file);
  }

  @Get("my-month/:date")
  getMyMonth(@CurrentUser() mate: Mate, @Param("date") date: string) {
    return this.daysPicturesService.getMyMonth(mate, date);
  }

  @Get("mates-month/:date")
  getMatesMonth(@CurrentUser() mate: Mate, @Param("date") date: string) {
    return this.daysPicturesService.getMatesMonth(mate.couple.mates.find(m => m.id !== mate.id), date);
  }
}
