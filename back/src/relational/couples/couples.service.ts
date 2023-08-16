import { Injectable } from '@nestjs/common';
import { CreateCoupleDto } from './dto/create-couple.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Couple } from './entities/couple.entity';
import { Repository } from 'typeorm';
import { Mate } from '../mates/entities/mate.entity';

@Injectable()
export class CouplesService {

  constructor(
    @InjectRepository(Couple)
    private readonly coupleRepository: Repository<Couple>,

    @InjectRepository(Mate)
    private readonly mateRepository: Repository<Mate>
  ) { }

  async create(createCoupleDto: CreateCoupleDto) {
    return await this.coupleRepository.save({
      mates: [await this.mateRepository.findOne({ where: { id: createCoupleDto.matesIds[0] } }), await this.mateRepository.findOne({ where: { id: createCoupleDto.matesIds[1] } })],
      name: createCoupleDto.name ?? null
    })
  }

}
