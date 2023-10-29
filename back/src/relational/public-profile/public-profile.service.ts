import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BatteryGateway } from 'src/gateways/battery/battery.gateway';
import { PublicProfileGateway } from 'src/gateways/public-profile/public-profile.gateway';
import { MinioService } from 'src/minio/minio.service';
import { Repository } from 'typeorm';
import { CouplesService } from '../couples/couples.service';
import { Mate } from '../mates/entities/mate.entity';
import { UpdatePublicProfileDto } from './dto/update-public-profile.dto';
import { PublicProfile } from './entities/public-profile.entity';

@Injectable()
export class PublicProfileService {

  constructor(
    @InjectRepository(PublicProfile)
    private readonly publicProfileRepostiory: Repository<PublicProfile>,

    private readonly couplesService: CouplesService,
    private readonly minioService: MinioService,
    private readonly publicProfileGateway: PublicProfileGateway,
    private readonly batteryGateway: BatteryGateway

  ) { }

  async updateMyPublicProfile(mate: Mate, updatePublicProfileDto: UpdatePublicProfileDto): Promise<PublicProfile> {
    if (!updatePublicProfileDto.lastLocation) updatePublicProfileDto.lastLocation = mate.publicProfile.lastLocation;
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

  async updateMyMatesPublicProfile(mate: Mate, updatePublicProfileDto: UpdatePublicProfileDto): Promise<PublicProfile> {
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

  async updateProfilePicture(mate: Mate, file: Express.Multer.File) {
    const path = `/users/${mate.email}/profile-pictures/original/${file.originalname.split(".")[0] + '.webp'}`;
    await this.minioService.uploadFile(path, file);
    this.updateMyPublicProfile(mate, {
      profilePicture: path
    });
    this.publicProfileGateway.updateMyProfilePicture(mate);
    return await this.publicProfileRepostiory.findOne({ where: { id: mate.publicProfile.id }, relations: ["sadness"] });
  }

  async getMyMatesProfilePicture(mate: Mate, format: string): Promise<string> {
    try {
      const myMate = await this.couplesService.getMyMate(mate);
      const url = await this.minioService.generateUrl(myMate.publicProfile.profilePicture.replace("original", format));
      return url
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async updateMyBattery(mate: Mate, battery: { batteryLevel: number }) {
    if (battery.batteryLevel) {
      const updatePublicProfileDto: UpdatePublicProfileDto = {};
      updatePublicProfileDto.lastBatteryPercentage = battery.batteryLevel.toString()
      await this.publicProfileRepostiory.update(mate.publicProfile.id, updatePublicProfileDto)
      this.batteryGateway.emitNewBatteryLevel(mate, battery.batteryLevel)
    }
  }
}
