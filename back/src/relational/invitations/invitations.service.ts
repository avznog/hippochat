import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invitation } from './entities/invitation.entity';
import { IsNull, Repository } from 'typeorm';
import { Mate } from '../mates/entities/mate.entity';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { CouplesService } from '../couples/couples.service';

@Injectable()
export class InvitationsService {

  constructor(
    @InjectRepository(Invitation)
    private readonly invitationRepository: Repository<Invitation>,

    private readonly couplesService: CouplesService
  ) { }

  async findMy(mate: Mate) {
    try {
      return await this.invitationRepository.find({
        where: [
          {
            asker: {
              id: mate.id
            },
            denied: IsNull()
          },
          {
            receiver: {
              id: mate.id
            },
            denied: IsNull()
          }
        ],
        relations: ["asker", "receiver", "asker.publicProfile", "receiver.publicProfile"]
      })
    } catch (error) {
      throw new HttpException("Impossible de récupérer les invitations", HttpStatus.INTERNAL_SERVER_ERROR), error
    }
  }

  async create(createInvitationDto: CreateInvitationDto) {
    try {
      return await this.invitationRepository.save(createInvitationDto);
    } catch (error) {
      throw new HttpException("Impossible de créer l'invitation", HttpStatus.INTERNAL_SERVER_ERROR), error
    }
  }

  async accept(mate: Mate, id: string) {
    try {
      await this.invitationRepository.update(id, { denied: false });
      const invitation = await this.invitationRepository.findOne({ where: { id: id }, relations: ["asker"] });
      return await this.couplesService.create({
        matesIds: [mate.id, invitation.asker.id]
      })

    } catch (error) {
      console.log(error)
    }
  }

  async deleteMyAccount(mate: Mate) {
    try {
      const m = await this.invitationRepository.find({ where: [{ asker: { id: mate.id } }, { receiver: { id: mate.id } }] });
      return await this.invitationRepository.delete(m.map(me => me.id));
    } catch (error) {

    }
  }
}
