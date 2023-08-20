import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.model';
import JwtAuthGuard from 'src/auth/guards/jwt-auth.guard';
import { Mate } from '../mates/entities/mate.entity';
import { UpdatePublicProfileDto } from './dto/update-public-profile.dto';
import { PublicProfileService } from './public-profile.service';

@Controller('public-profile')
@UseGuards(JwtAuthGuard)
export class PublicProfileController {
  constructor(private readonly publicProfileService: PublicProfileService) {}

  @Patch("my")
  updateMyPublicProfile(@CurrentUser() mate: Mate, @Body() updatePublicProfileDto: UpdatePublicProfileDto) {
    return this.publicProfileService.updateMyPublicProfile(mate, updatePublicProfileDto);
  }

  @Patch("my-mate")
  updateMyMatesPublicProfile(@CurrentUser() mate: Mate, @Body() updatePublicProfileDto: UpdatePublicProfileDto) {
    return this.publicProfileService.updateMyMatesPublicProfile(mate, updatePublicProfileDto);
  }

  @Get("my")
  getMyPublicProfile(@CurrentUser() mate: Mate) {
    return mate.publicProfile;
  }

  @Get("my-mate")
  getMyMatesPublicProfile(@CurrentUser() mate: Mate) {
    return this.publicProfileService.getMyMatesPublicProfile(mate);
  }
}
