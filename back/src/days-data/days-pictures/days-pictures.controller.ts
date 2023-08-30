import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DaysPicturesService } from './days-pictures.service';
import { CreateDaysPictureDto } from './dto/create-days-picture.dto';
import { UpdateDaysPictureDto } from './dto/update-days-picture.dto';

@Controller('days-pictures')
export class DaysPicturesController {
  constructor(private readonly daysPicturesService: DaysPicturesService) {}

  @Post()
  create(@Body() createDaysPictureDto: CreateDaysPictureDto) {
    return this.daysPicturesService.create(createDaysPictureDto);
  }

  @Get()
  findAll() {
    return this.daysPicturesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.daysPicturesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDaysPictureDto: UpdateDaysPictureDto) {
    return this.daysPicturesService.update(+id, updateDaysPictureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.daysPicturesService.remove(+id);
  }
}
