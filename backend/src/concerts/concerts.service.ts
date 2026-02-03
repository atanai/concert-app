import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateConcertDto } from './dto/create-concert.dto';
import { Concert } from './entities/concert.entity';
import { QueryFailedError, Repository } from 'typeorm';

@Injectable()
export class ConcertsService {
  constructor(
    @InjectRepository(Concert)
    private concertsRepository: Repository<Concert>,
  ) { }

  async create(createConcertDto: CreateConcertDto) {
    try {
      const concert = this.concertsRepository.create(createConcertDto);
      return await this.concertsRepository.save(concert);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const pgError = error as any;

        // unique constraint violation
        if (pgError.code === '23505') {
          throw new BadRequestException('Concert name already exists');
        }

        // not null violation
        if (pgError.code === '23502') {
          throw new BadRequestException('Missing required field');
        }
      }

      throw new InternalServerErrorException('Failed to create concert');
    }
  }

  findAll() {
    return this.concertsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} concert`;
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
