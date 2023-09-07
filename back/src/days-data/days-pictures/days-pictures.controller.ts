import { Controller, Get, HttpException, HttpStatus, Param, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
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
  async getMyMatesToday(@CurrentUser() mate: Mate, @Res() response: Response) {
    try {
      const file = await this.daysPicturesService.getTodayDaysPicture(mate.couple.mates.find(m => m.id !== mate.id));
      if(!file)
        response.send(null);
      else
        file.pipe(response);
    } catch (error) {
      console.log(error)
      throw new HttpException("No file found", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get("get-my-today")
  async getMyToday(@CurrentUser() mate: Mate, @Res() response: Response) {
    try {
      const file = await this.daysPicturesService.getTodayDaysPicture(mate);
      if(!file)
        response.send(null)
      else
        file.pipe(response);
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

  @Get("get-my-for-date/:date")
  async getMyForDate(@CurrentUser() mate: Mate, @Param("date") date: string, @Res() response: Response) {
    try {
      const file = await this.daysPicturesService.getMyForDate(mate, date);
      if(!file)
        response.send(null)
      else
        file.pipe(response)
    } catch (error) {
      console.log(error)
      return null
    }
  }

  @Get("get-mates-for-date/:date")
  async getMyMatesForDate(@CurrentUser() mate: Mate, @Param("date") date: string, @Res() response: Response) {
    try {
      const file = await this.daysPicturesService.getMyMatesForDate(mate, date);
      if(!file)
        response.send(null)
      else
        file.pipe(response)
    } catch (error) {
      console.log(error)
      return null
    }
  }
}
