import { Injectable } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { QueryFailedError, Repository } from 'typeorm';
import { History } from './entities/history.entity';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';

@Injectable()
export class HistoriesService {
  constructor(
    @InjectRepository(History)
    private historiesRepository: Repository<History>,
  ) { }

  create(createHistoryDto: CreateHistoryDto) {
    return 'This action adds a new history';
  }

  findAll() {
    return this.historiesRepository.find();
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
