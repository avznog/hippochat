import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import TokenPayload from 'src/auth/interfaces/tokenPayload.interface';
import { Sex } from 'src/constants/sex.type';
import { ILike, IsNull, Repository } from 'typeorm';
import { CouplesService } from '../couples/couples.service';
import { Mate } from './entities/mate.entity';
import { UpdateMateDto } from './dto/update-mate.dto';

@Injectable()
export class MatesService {
  constructor(
    @InjectRepository(Mate)
    private readonly mateRepository: Repository<Mate>,

    private readonly couplesService: CouplesService,
  ) { }

  async findByPayload(payload: TokenPayload): Promise<Mate> {
    try {
      return await this.mateRepository.findOne({
        relations: ["couple", "publicProfile", "publicProfile.sadness", "couple.mates"],
        where: {
          email: payload.username
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

  async findAllSingle(gender: string, name: string): Promise<Mate[]> {
    return await this.mateRepository.find({
      relations: ["publicProfile"],
      where: {
        publicProfile: {
          sex: gender === 'male' ? Sex.MALE : Sex.FEMALE
        },
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
}
