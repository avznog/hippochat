import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import TokenPayload from 'src/auth/interfaces/tokenPayload.interface';
import { DaysEmojisService } from 'src/days-data/days-emojis/days-emojis.service';
import { DaysPicturesService } from 'src/days-data/days-pictures/days-pictures.service';
import { ILike, IsNull, Repository } from 'typeorm';
import { CouplesService } from '../couples/couples.service';
import { MessagesService } from '../messages/messages.service';
import { PublicProfileService } from '../public-profile/public-profile.service';
import { SadnessService } from '../sadness/sadness.service';
import { UpdateMateDto } from './dto/update-mate.dto';
import { Mate } from './entities/mate.entity';

@Injectable()
export class MatesService {
  constructor(
    @InjectRepository(Mate)
    private readonly mateRepository: Repository<Mate>,

    private readonly couplesService: CouplesService,
    private readonly publicProfileService: PublicProfileService,
    private readonly messagesService: MessagesService,
    private readonly daysEmojisService: DaysEmojisService,
    private readonly daysPicturesService: DaysPicturesService,
    private readonly sadnessService: SadnessService
  ) { }

  async findByPayload(payload: TokenPayload): Promise<Mate> {
    try {
      return await this.mateRepository.findOne({
        relations: ["couple", "publicProfile", "publicProfile.sadness", "couple.mates"],
        where: {
          pseudo: payload.username
        }
      })
    } catch (error) {
      console.log(error)
      throw new HttpException("Can't get payload", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async amInCouple(me: Mate) {
    const mate = await this.mateRepository.findOne({
      where: {
        id: me.id
      },
      relations: ["couple"]
    });
    return mate.couple ? true : false
  }

  async findAllSingle(name: string): Promise<Mate[]> {
    return await this.mateRepository.find({
      relations: ["publicProfile"],
      where: {
        couple: IsNull(),
        firstname: ILike(`%${name}%`),
        lastname: ILike(`%${name}%`)
      }
    })
  }

  async getMyMate(mate: Mate) {
    return (await this.couplesService.getMyCouple(mate)).mates.find(m => m.id !== mate.id);
  }

  async update(mate: Mate, updateMateDto: UpdateMateDto) {
    return await this.mateRepository.update(mate.id, updateMateDto);
  }

  async deleteMyAccount(mate: Mate) {
    await this.messagesService.deleteMyAccount(mate);
    await this.daysEmojisService.deleteMyAccount(mate);
    await this.daysPicturesService.deleteMyAccount(mate);
    await this.sadnessService.deleteMyAccount(mate);
    await this.couplesService.deleteMyAccount(mate);
    await this.mateRepository.update(mate.id, { publicProfile: null })
    await this.publicProfileService.deleteMyAccount(mate);
    return await this.mateRepository.delete(mate.id)
  }
}
