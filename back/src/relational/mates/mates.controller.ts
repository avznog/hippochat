import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorators/current-user.model';
import JwtAuthGuard from 'src/auth/guards/jwt-auth.guard';
import { ParamsFindAllSingleDto } from './dto/params-find-all-single.dto';
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

  @Post("find-all-single")
  findAllSingle(@Body() params: ParamsFindAllSingleDto) {
    return this.matesService.findAllSingle(params);
  }

  @Get("my")
  getMyMate(@CurrentUser() mate: Mate) {
    return this.matesService.getMyMate(mate);
  }

  @Patch("me")
  update(@CurrentUser() mate: Mate, @Body() updateMateDto: UpdateMateDto) {
    return this.matesService.update(mate, updateMateDto);
  }

  @Delete()
  deleteMyAccount(@CurrentUser() mate: Mate) {
    return this.matesService.deleteMyAccount(mate);
  }
}
