import { PartialType } from '@nestjs/swagger';
import { CreateSadnessDto } from './create-sadness.dto';

export class UpdateSadnessDto extends PartialType(CreateSadnessDto) {}
