import { Controller, Get, Param, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MatesService } from './mates.service';
import { CurrentUser } from 'src/auth/decorators/current-user.model';
import { Mate } from './entities/mate.entity';
import JwtAuthGuard from 'src/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags("mates")
@Controller('mates')
@UseGuards(JwtAuthGuard)
export class MatesController {
  constructor(private readonly matesService: MatesService) {}

  @Get("me")
  me(@CurrentUser() user: Mate) : Mate {
    return user;
  }

  @Get("am-in-couple")
  amInCouple(@CurrentUser() me: Mate) {
    return this.matesService.amInCouple(me);
  }

  @Get("find-all-single")
  findAllSingle(@Query() params: { gender: string, name: string}) {
    return this.matesService.findAllSingle(params.gender, params.name);
  }

  @Get("my")
  getMyMate(@CurrentUser() mate: Mate) {
    return this.matesService.getMyMate(mate);
  }
}
