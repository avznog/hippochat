import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSadnessDto } from './dto/create-sadness.dto';
import { Sadness } from './entities/sadness.entity';
import { Mate } from '../mates/entities/mate.entity';
import { PublicProfile } from '../public-profile/entities/public-profile.entity';

@Injectable()
export class SadnessService {

  constructor(
    @InjectRepository(Sadness)
    private readonly sadnessRepository: Repository<Sadness>,

    @InjectRepository(PublicProfile)
    private readonly publicProfileRepository: Repository<PublicProfile>,
  ) {}

  async create(mate: Mate, createSadnessDto: CreateSadnessDto) {
    const publicProfile = await this.publicProfileRepository.findOne({
      where: {
        id: mate.publicProfile.id
      }
    })
    return await this.sadnessRepository.save({...createSadnessDto, publicProfile: publicProfile});
  }
}
