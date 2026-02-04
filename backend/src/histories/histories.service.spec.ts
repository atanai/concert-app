import { Test, TestingModule } from '@nestjs/testing';
import { HistoriesService } from './histories.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { History } from './entities/history.entity';

describe('HistoriesService', () => {
  let service: HistoriesService;
  let repository: Repository<History>;

  const mockHistoryRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
  };


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HistoriesService,
        {
          provide: getRepositoryToken(History),
          useValue: mockHistoryRepository,
        },
      ],
    }).compile();

    service = module.get<HistoriesService>(HistoriesService);
    repository = module.get<Repository<History>>(getRepositoryToken(History));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create history record', async () => {
    const dto = {
      userId: 1,
      concertId: 2,
      action: 1,
      dateTime: new Date().toISOString(),
    };

    const createdEntity = { id: 1, ...dto };

    mockHistoryRepository.create.mockReturnValue(createdEntity);
    mockHistoryRepository.save.mockResolvedValue(createdEntity);

    const result = await service.create(dto);

    expect(mockHistoryRepository.create).toHaveBeenCalledWith({
      userId: dto.userId,
      concertId: dto.concertId,
      action: dto.action,
    });

    expect(mockHistoryRepository.save).toHaveBeenCalledWith(createdEntity);
    expect(result).toEqual(createdEntity);
  });
});
