import { Body, Controller, Get, Patch, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorators/current-user.model';
import JwtAuthGuard from 'src/auth/guards/jwt-auth.guard';
import { UpdateMateDto } from './dto/update-mate.dto';
import { Mate } from './entities/mate.entity';
import { MatesService } from './mates.service';

@ApiTags("mates")
@Controller('mates')
@UseGuards(JwtAuthGuard)
export class MatesController {
  constructor(private readonly matesService: MatesService) { }

  @Get("me")
  me(@CurrentUser() user: Mate): Mate {
    return user;
  }

  @Get("am-in-couple")
  amInCouple(@CurrentUser() me: Mate) {
    return this.matesService.amInCouple(me);
  }

  @Get("find-all-single")
  findAllSingle(@Query() params: { name: string }) {
    return this.matesService.findAllSingle(params.name);
  }

  @Get("my")
  getMyMate(@CurrentUser() mate: Mate) {
    return this.matesService.getMyMate(mate);
  }

  @Patch("me")
  update(@CurrentUser() mate: Mate, @Body() updateMateDto: UpdateMateDto) {
    return this.matesService.update(mate, updateMateDto);
  }
}
