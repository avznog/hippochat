import { PartialType } from '@nestjs/swagger';
import { CreateDaysPictureDto } from './create-days-picture.dto';

export class UpdateDaysPictureDto extends PartialType(CreateDaysPictureDto) {}
