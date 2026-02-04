import { Injectable } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { Repository } from 'typeorm';
import { History } from './entities/history.entity';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';

@Injectable()
export class HistoriesService {
  constructor(
    @InjectRepository(History)
    private historiesRepository: Repository<History>,
  ) { }

  async create(createHistoryDto: CreateHistoryDto) {
    const history = this.historiesRepository.create({
      userId: createHistoryDto.userId,
      concertId: createHistoryDto.concertId,
      action: createHistoryDto.action,
    });

    return await this.historiesRepository.save(history);
  }

  async findAll() {
    const histories = await this.historiesRepository.find({
      relations: ['user', 'concert'],
      withDeleted: true,
    });
    return histories.map(h => ({
      id: h.id,
      dateTime: h.dateTime,
      action: h.action,
      user: h.user.name,
      concert: h.concert.name,
    }));
  }

  findOne(id: number) {
    return `This action returns a #${id} history`;
  }

  update(id: number, updateHistoryDto: UpdateHistoryDto) {
    return `This action updates a #${id} history`;
  }

  remove(id: number) {
    return `This action removes a #${id} history`;
  }
}
