import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SadnessGateway } from 'src/gateways/sadness/sadness.gateway';
import { Repository } from 'typeorm';
import { Mate } from '../mates/entities/mate.entity';
import { PublicProfile } from '../public-profile/entities/public-profile.entity';
import { CreateSadnessDto } from './dto/create-sadness.dto';
import { Sadness } from './entities/sadness.entity';

@Injectable()
export class SadnessService {

  constructor(
    @InjectRepository(Sadness)
    private readonly sadnessRepository: Repository<Sadness>,

    @InjectRepository(PublicProfile)
    private readonly publicProfileRepository: Repository<PublicProfile>,
    private readonly sadnessGateway: SadnessGateway
  ) { }

  async create(mate: Mate, createSadnessDto: CreateSadnessDto) {
    const publicProfile = await this.publicProfileRepository.findOne({
      where: {
        id: mate.publicProfile.id
      }
    })
    const sadness = await this.sadnessRepository.save({ ...createSadnessDto, publicProfile: publicProfile });
    this.sadnessGateway.createMateSadness(sadness, mate);
    return sadness;
  }

  async deleteMyAccount(mate: Mate) {
    try {
      const sa = await this.sadnessRepository.find({ where: { publicProfile: { id: mate.publicProfile.id } } });
      return await this.sadnessRepository.delete(sa.map(s => s.id))
    } catch (error) {

    }
  }
}
