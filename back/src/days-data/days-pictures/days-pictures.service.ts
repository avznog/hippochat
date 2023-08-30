import { Injectable } from '@nestjs/common';
import { CreateDaysPictureDto } from './dto/create-days-picture.dto';
import { UpdateDaysPictureDto } from './dto/update-days-picture.dto';

@Injectable()
export class DaysPicturesService {
  create(createDaysPictureDto: CreateDaysPictureDto) {
    return 'This action adds a new daysPicture';
  }

  findAll() {
    return `This action returns all daysPictures`;
  }

  findOne(id: number) {
    return `This action returns a #${id} daysPicture`;
  }

  update(id: number, updateDaysPictureDto: UpdateDaysPictureDto) {
    return `This action updates a #${id} daysPicture`;
  }

  remove(id: number) {
    return `This action removes a #${id} daysPicture`;
  }
}
