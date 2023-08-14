import { PartialType } from '@nestjs/swagger';
import { CreateCoupleDto } from './create-couple.dto';

export class UpdateCoupleDto extends PartialType(CreateCoupleDto) {}
