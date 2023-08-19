import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PublicProfile } from './entities/public-profile.entity';
import { Repository } from 'typeorm';
import { Mate } from '../mates/entities/mate.entity';
import { UpdatePublicProfileDto } from './dto/update-public-profile.dto';
import { CouplesService } from '../couples/couples.service';

@Injectable()
export class PublicProfileService {

  constructor(
    @InjectRepository(PublicProfile)
    private readonly publicProfileRepostiory: Repository<PublicProfile>,

    private readonly couplesService: CouplesService

  ) {}

  async updateMyPublicProfile(mate: Mate, updatePublicProfileDto: UpdatePublicProfileDto) : Promise<PublicProfile> {
    await this.publicProfileRepostiory.update(mate.publicProfile.id, updatePublicProfileDto);
    return {
      ...mate.publicProfile,
      ...updatePublicProfileDto
    }
  }

  async getMyMatesPublicProfile(mate: Mate) {
    const couple = await this.couplesService.getMyCouple(mate);
    return await this.publicProfileRepostiory.findOne({
      where: {
        id: couple.mates.find(m => m.id !== mate.id).publicProfile.id
      }
    })
  }
}
