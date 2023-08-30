import { Module } from '@nestjs/common';
import { DaysEmojisModule } from './days-emojis/days-emojis.module';
import { DaysPicturesModule } from './days-pictures/days-pictures.module';

@Module({
  imports: [DaysEmojisModule, DaysPicturesModule]
})
export class DaysDataModule {}
