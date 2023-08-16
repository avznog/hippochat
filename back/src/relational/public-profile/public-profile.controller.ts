import { Controller, UseGuards } from '@nestjs/common';
import JwtAuthGuard from 'src/auth/guards/jwt-auth.guard';
import { PublicProfileService } from './public-profile.service';

@Controller('public-profile')
@UseGuards(JwtAuthGuard)
export class PublicProfileController {
  constructor(private readonly publicProfileService: PublicProfileService) {}

  
}
