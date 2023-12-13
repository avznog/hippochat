import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorators/current-user.model';
import JwtAuthGuard from 'src/auth/guards/jwt-auth.guard';
import { Mate } from '../mates/entities/mate.entity';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { Invitation } from './entities/invitation.entity';
import { InvitationsService } from './invitations.service';

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

  @Patch(":id")
  denyInvitation(@Param("id") id: string): Promise<Invitation> {
    return this.invitationsService.denyInvitation(id, { denied: true });
  }
}
