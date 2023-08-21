import { Module } from '@nestjs/common';
import { SadnessService } from './sadness.service';
import { SadnessController } from './sadness.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sadness } from './entities/sadness.entity';
import { PublicProfile } from '../public-profile/entities/public-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sadness, PublicProfile])],
  controllers: [SadnessController],
  providers: [SadnessService]
})
export class SadnessModule {}
