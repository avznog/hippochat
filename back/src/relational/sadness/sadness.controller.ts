import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.model';
import { Mate } from '../mates/entities/mate.entity';
import { CreateSadnessDto } from './dto/create-sadness.dto';
import { SadnessService } from './sadness.service';
import JwtAuthGuard from 'src/auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('sadness')
@UseGuards(JwtAuthGuard)
@ApiTags("sadness")
export class SadnessController {
  constructor(private readonly sadnessService: SadnessService) {}

  @Post()
  create(@CurrentUser() mate: Mate, @Body() createSadnessDto: CreateSadnessDto) {
    return this.sadnessService.create(mate, createSadnessDto);
  }
}
