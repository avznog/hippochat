import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorators/current-user.model';
import JwtAuthGuard from 'src/auth/guards/jwt-auth.guard';
import { MinioService } from 'src/minio/minio.service';
import { Mate } from '../mates/entities/mate.entity';
import { UpdatePublicProfileDto } from './dto/update-public-profile.dto';
import { PublicProfileService } from './public-profile.service';

@Controller('public-profile')
@UseGuards(JwtAuthGuard)
@ApiTags("public-profile")
export class PublicProfileController {
  constructor(
    private readonly publicProfileService: PublicProfileService,
    private readonly minioService: MinioService,
  ) { }

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
    return await this.publicProfileService.updateProfilePicture(mate, file);
  }

  @Get("get-my-profile-picture")
  async getMyProfilePicture(@CurrentUser() mate: Mate): Promise<string | null> {
    return await this.getProfilePicture(mate, "original");
  }

  @Get("get-my-small-profile-picture")
  async getSmallMyProfilePicture(@CurrentUser() mate: Mate) {
    return await this.getProfilePicture(mate, "80x100");
  }

  @Get("get-mate-profile-picture")
  async getMateProfilePicture(@CurrentUser() mate: Mate): Promise<string> {
    try {
      const url = await this.publicProfileService.getMyMatesProfilePicture(mate, "original")
      if (!url) {
        return null
      } else {
        return JSON.stringify(url);
      }
    } catch (error) {
      console.log(error)
      throw new HttpException("No file found", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get("get-mate-small-profile-picture")
  async getMateSmallProfilePicture(@CurrentUser() mate: Mate): Promise<string> {
    try {
      const url = await this.publicProfileService.getMyMatesProfilePicture(mate, "80x100")
      if (!url) {
        return null
      } else {
        return JSON.stringify(url)
      }
    } catch (error) {
      console.log(error)
      throw new HttpException("No file found", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getProfilePicture(mate: Mate, format: string) {
    try {
      const url = await this.minioService.generateUrl(mate.publicProfile.profilePicture.replace("original", format));
      if (!url)
        return null;
      else
        return JSON.stringify(url);
    } catch (error) {
      console.log(error)
      throw new HttpException("No file found", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
