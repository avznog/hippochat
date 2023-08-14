import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mate } from './entities/mate.entity';
import { Repository } from 'typeorm';
import TokenPayload from 'src/auth/interfaces/tokenPayload.interface';

@Injectable()
export class MatesService {
  constructor(
    @InjectRepository(Mate)
    private readonly mateRepository: Repository<Mate>
  ) {}

  async findByPayload(payload: TokenPayload) : Promise<Mate> {
    try {
      return await this.mateRepository.findOne({
        where: {
          email: payload.username
        }
      })
    } catch (error) {
      console.log(error)
      throw new HttpException("Can't get payload", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  amInCouple(me: Mate) {
    const mate = this.mateRepository.findOne({
      where: {
        id: me.id
      },
      relations: ["couple"]
    });
    return mate
  }
}
