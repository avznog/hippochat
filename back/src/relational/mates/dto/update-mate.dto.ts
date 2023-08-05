import { PartialType } from '@nestjs/mapped-types';
import { CreateMateDto } from './create-mate.dto';

export class UpdateMateDto extends PartialType(CreateMateDto) {}
