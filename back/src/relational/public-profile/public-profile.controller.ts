import { Body, Controller, Get, HttpException, HttpStatus, Patch, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { CurrentUser } from 'src/auth/decorators/current-user.model';
import JwtAuthGuard from 'src/auth/guards/jwt-auth.guard';
import { Mate } from '../mates/entities/mate.entity';
import { UpdatePublicProfileDto } from './dto/update-public-profile.dto';
import { PublicProfileService } from './public-profile.service';
import { MinioService } from 'src/minio/minio.service';

@Controller('public-profile')
@UseGuards(JwtAuthGuard)
export class PublicProfileController {
  constructor(
    private readonly publicProfileService: PublicProfileService,
    private readonly minioService: MinioService
    ) {}

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

  @Post("update-profile-picture")
  @UseInterceptors(FileInterceptor("file"))
  async updateProfilePicture(@CurrentUser() mate: Mate, @UploadedFile() file: Express.Multer.File) {
    return await this.publicProfileService.updateProfilePicture(mate, file)
  }

  @Get("get-my-profile-picture")
  async getMyProfilePicture(@Res() response: Response, @CurrentUser() mate: Mate)  {
    try {
      const file = await this.minioService.getFile(mate.publicProfile.profilePicture);
      file.pipe(response)
    } catch (error) { 
      console.log(error)
      throw new HttpException("No file found", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get("get-mate-profile-picture")
  async getMateProfilePicture(@Res() response: Response, @CurrentUser() mate: Mate) {
      const file = await this.publicProfileService.getMyMatesProfilePicture(mate)
      file.pipe(response)
    
  }
}
