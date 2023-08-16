import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CouplesService } from './couples.service';
import JwtAuthGuard from 'src/auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { CreateCoupleDto } from './dto/create-couple.dto';

@Controller('couples')
@ApiTags("couples")
@UseGuards(JwtAuthGuard)
export class CouplesController {
  constructor(private readonly couplesService: CouplesService) {}

  @Post()
  create(@Body() createCoupleDto: CreateCoupleDto) {
    return this.couplesService.create(createCoupleDto);
  }
}
