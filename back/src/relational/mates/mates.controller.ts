import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MatesService } from './mates.service';
import { CurrentUser } from 'src/auth/decorators/current-user.model';
import { Mate } from './entities/mate.entity';
import JwtAuthGuard from 'src/auth/guards/jwt-auth.guard';

@ApiTags("mates")
@Controller('mates')
@UseGuards(JwtAuthGuard)
export class MatesController {
  constructor(private readonly matesService: MatesService) {}

  @Get("me")
  me(@CurrentUser() user: Mate) : Mate {
    return user;
  }
}