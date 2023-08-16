import { Module } from '@nestjs/common';
import { PublicProfileService } from './public-profile.service';
import { PublicProfileController } from './public-profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicProfile } from './entities/public-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PublicProfile])],
  controllers: [PublicProfileController],
  providers: [PublicProfileService]
})
export class PublicProfileModule {}
