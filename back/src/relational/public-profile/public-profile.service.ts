import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PublicProfile } from './entities/public-profile.entity';
import { Repository } from 'typeorm';
import { Mate } from '../mates/entities/mate.entity';
import { UpdatePublicProfileDto } from './dto/update-public-profile.dto';
import { CouplesService } from '../couples/couples.service';
import { PublicProfileGateway } from 'src/gateways/public-profile/public-profile.gateway';

@Injectable()
export class PublicProfileService {

  constructor(
    @InjectRepository(PublicProfile)
    private readonly publicProfileRepostiory: Repository<PublicProfile>,

    private readonly couplesService: CouplesService,
    private readonly publicProfileGateway: PublicProfileGateway

  ) {}

  async updateMyPublicProfile(mate: Mate, updatePublicProfileDto: UpdatePublicProfileDto) : Promise<PublicProfile> {
    await this.publicProfileRepostiory.update(mate.publicProfile.id, updatePublicProfileDto);
    this.publicProfileGateway.updateMyPublicProfile(mate, {
      ...mate.publicProfile,
      ...updatePublicProfileDto
    })
    return {
      ...mate.publicProfile,
      ...updatePublicProfileDto
    }
  }

  async updateMyMatesPublicProfile(mate: Mate, updatePublicProfileDto: UpdatePublicProfileDto) : Promise<PublicProfile> {
    const myMatesPublicProfile = (await this.couplesService.getMyMate(mate)).publicProfile;
    await this.publicProfileRepostiory.update(myMatesPublicProfile.id, updatePublicProfileDto);
    this.publicProfileGateway.updateMatePublicProfile(mate, {
      ...myMatesPublicProfile,
      ...updatePublicProfileDto
    });
    return {
      ...myMatesPublicProfile,
      ...updatePublicProfileDto
    }
  }

  async getMyMatesPublicProfile(mate: Mate) {
    const couple = await this.couplesService.getMyCouple(mate);
    return await this.publicProfileRepostiory.findOne({
      relations: ["sadness"],
      where: {
        id: couple.mates.find(m => m.id !== mate.id).publicProfile.id
      }
    })
  }
}
