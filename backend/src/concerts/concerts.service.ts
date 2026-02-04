import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateConcertDto } from './dto/create-concert.dto';
import { Concert } from './entities/concert.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { UpdateConcertDto } from './dto/update-concert.dto';
import { HistoriesService } from 'src/histories/histories.service';

@Injectable()
export class ConcertsService {
  constructor(
    @InjectRepository(Concert)
    private concertsRepository: Repository<Concert>,
    private readonly historiesService: HistoriesService
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

  update(id: number, updateConcertDto: UpdateConcertDto) {
    return `This action updates a #${id} concert`;
  }

  async remove(id: number) {
    const concert = await this.concertsRepository.findOneBy({ id });

    if (!concert) {
      throw new NotFoundException('Concert not found');
    }

    // await this.concertsRepository.remove(concert);
    await this.concertsRepository.softDelete(id);

    return { success: true };
  }

  async reserveSeat(concertId: number, userId: number) {
    const concert = await this.concertsRepository.findOne({
      where: { id: concertId },
    });

    if (!concert) throw new NotFoundException();

    if (concert.reservedSeats.includes(userId)) {
      throw new BadRequestException('Already reserved');
    }

    if (concert.reservedSeats.length >= concert.seats) {
      throw new BadRequestException('Concert is full');
    }

    concert.reservedSeats.push(userId);

    await this.historiesService.create({
      userId,
      concertId,
      action: 1, // reserve
    });
    return this.concertsRepository.save(concert);
  }

  async cancelSeat(concertId: number, userId: number) {
    const concert = await this.concertsRepository.findOne({
      where: { id: concertId },
    });

    if (!concert) throw new NotFoundException();

    if (!concert.reservedSeats.includes(userId)) {
      throw new BadRequestException('Not reserved');
    }

    concert.reservedSeats = concert.reservedSeats.filter(
      id => id !== userId,
    );

    concert.cancelledSeats.push(userId);

    await this.historiesService.create({
      userId,
      concertId,
      action: 0 // cancel
    });

    return this.concertsRepository.save(concert);
  }
}
