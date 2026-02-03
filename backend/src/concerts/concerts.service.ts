import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateConcertDto } from './dto/create-concert.dto';
import { UpdateConcertDto } from './dto/update-concert.dto';
import { Concert } from './entities/concert.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConcertsService {
  constructor(
    @InjectRepository(Concert)
    private concertsRepository: Repository<Concert>,
  ) { }

  create(createConcertDto: CreateConcertDto) {
    const concert = this.concertsRepository.create(createConcertDto);
    return this.concertsRepository.save(concert);
  }

  findAll() {
    return this.concertsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} concert`;
  }

  update(id: number, updateConcertDto: UpdateConcertDto) {
    return `This action updates a #${id} concert`;
  }

  async remove(id: number) {
    const concert = await this.concertsRepository.findOneBy({ id });

    if (!concert) {
      throw new NotFoundException('Concert not found');
    }

    await this.concertsRepository.remove(concert);

    return { success: true };
  }
}
