import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoupleGateway } from 'src/gateways/couple/couple.gateway';
import { Repository } from 'typeorm';
import { Mate } from '../mates/entities/mate.entity';
import { CreateCoupleDto } from './dto/create-couple.dto';
import { UpdateCoupleDto } from './dto/update-couple.dto';
import { Couple } from './entities/couple.entity';

@Injectable()
export class CouplesService {

  constructor(
    @InjectRepository(Couple)
    private readonly coupleRepository: Repository<Couple>,

    @InjectRepository(Mate)
    private readonly mateRepository: Repository<Mate>,

    private readonly coupleGateway: CoupleGateway
  ) { }

  async create(createCoupleDto: CreateCoupleDto) {
    return await this.coupleRepository.save({
      mates: [await this.mateRepository.findOne({ where: { id: createCoupleDto.matesIds[0] } }), await this.mateRepository.findOne({ where: { id: createCoupleDto.matesIds[1] } })],
      name: createCoupleDto.name ?? null
    })
  }

  async getMyCouple(mate: Mate): Promise<Couple> {
    try {
      return await this.coupleRepository.findOne({
        relations: ["mates", "mates.publicProfile", "mates.publicProfile.sadness"],
        where: {
          id: mate.couple.id
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  async getMyMate(mate: Mate): Promise<Mate> {
    const couple = await this.coupleRepository.findOne({
      relations: ["mates", "mates.publicProfile", "mates.publicProfile.sadness"],
      where: {
        id: mate.couple.id
      }
    });
    return couple.mates.find(m => m.id !== mate.id);
  }

  async updateMyCouple(mate: Mate, updateCoupleDto: UpdateCoupleDto): Promise<Couple> {
    await this.coupleRepository.update(mate.couple.id, updateCoupleDto)
    this.coupleGateway.updateMyCouple(mate, {
      ...mate.couple,
      ...updateCoupleDto
    })
    return {
      ...mate.couple,
      ...updateCoupleDto
    }
  }

  async deleteMyAccount(mate: Mate) {
    return await this.mateRepository.update(mate.id, { couple: null })
  }

}
