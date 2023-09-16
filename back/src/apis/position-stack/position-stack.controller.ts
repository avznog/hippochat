import { Body, Controller, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import JwtAuthGuard from 'src/auth/guards/jwt-auth.guard';
import { PositionStackService } from './position-stack.service';

@Controller('position-stack')
@UseGuards(JwtAuthGuard)
@ApiTags("position-stack")
export class PositionStackController {

  constructor(
    private readonly positionStackService: PositionStackService
  ) {}

  @Post()
  getLocation(@Body() params: { access_key: string, location: {latitude: string, longitude: string}, limit: number}) {
    return this.positionStackService.getLocation(params);
  }
 }
