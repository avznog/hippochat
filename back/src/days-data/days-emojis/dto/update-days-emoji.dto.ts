import { PartialType } from '@nestjs/swagger';
import { CreateDaysEmojiDto } from './create-days-emoji.dto';

export class UpdateDaysEmojiDto extends PartialType(CreateDaysEmojiDto) {}
