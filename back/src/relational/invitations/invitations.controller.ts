import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { CurrentUser } from 'src/auth/decorators/current-user.model';
import { Mate } from '../mates/entities/mate.entity';
import JwtAuthGuard from 'src/auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { CreateInvitationDto } from './dto/create-invitation.dto';

@Controller('invitations')
@UseGuards(JwtAuthGuard)
@ApiTags("invitations")
export class InvitationsController {
  constructor(private readonly invitationsService: InvitationsService) { }

  @Get("my")
  findMy(@CurrentUser() mate: Mate) {
    return this.invitationsService.findMy(mate);
  }

  @Post()
  create(@CurrentUser() mate: Mate, @Body() createInvitationDto: CreateInvitationDto) {
    createInvitationDto.asker = mate;
    return this.invitationsService.create(createInvitationDto);
  }

  @Get("accept/:id")
  accept(@CurrentUser() mate: Mate, @Param("id") id: string) {
    return this.invitationsService.accept(mate, id);
  }
}
