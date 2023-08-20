import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { CouplesService } from './couples.service';
import JwtAuthGuard from 'src/auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { CreateCoupleDto } from './dto/create-couple.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.model';
import { Mate } from '../mates/entities/mate.entity';
import { UpdateCoupleDto } from './dto/update-couple.dto';
import { Couple } from './entities/couple.entity';

@Controller('couples')
@ApiTags("couples")
@UseGuards(JwtAuthGuard)
export class CouplesController {
  constructor(private readonly couplesService: CouplesService) {}

  @Post()
  create(@Body() createCoupleDto: CreateCoupleDto) {
    return this.couplesService.create(createCoupleDto);
  }

  @Get("my-couple")
  getMyCouple(@CurrentUser() mate: Mate) {
    return this.couplesService.getMyCouple(mate);
  }

  @Patch("update-my-couple")
  updateMyCouple(@CurrentUser() mate: Mate, @Body() updateCoupleDto: UpdateCoupleDto) : Promise<Couple> {
    return this.couplesService.updateMyCouple(mate, updateCoupleDto);
  }

  @Get("my-mate")
  getMyMate(@CurrentUser() mate: Mate) {
    return this.couplesService.getMyMate(mate);
  }
}
