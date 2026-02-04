import { Test, TestingModule } from '@nestjs/testing';
import { ConcertsService } from './concerts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Concert } from './entities/concert.entity';
import { HistoriesService } from '../histories/histories.service';

describe('ConcertsService', () => {
  let service: ConcertsService;
  let repository: Repository<Concert>;

  const mockConcertRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
  };

  const mockHistoriesService = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConcertsService,
        {
          provide: getRepositoryToken(Concert),
          useValue: mockConcertRepository,
        },
        {
          provide: HistoriesService,
          useValue: mockHistoriesService,
        },
      ],
    }).compile();

    service = module.get<ConcertsService>(ConcertsService);
    repository = module.get<Repository<Concert>>(getRepositoryToken(Concert));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
