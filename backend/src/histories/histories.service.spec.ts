import { Test, TestingModule } from '@nestjs/testing';
import { HistoriesService } from './histories.service';
import { Repository } from 'typeorm';
import { History } from './entities/history.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateHistoryDto } from './dto/create-history.dto';

describe('HistoriesService', () => {
  let service: HistoriesService;
  let repository: jest.Mocked<Repository<History>>;

  const mockHistoryRepository = (): jest.Mocked<Repository<History>> =>
    ({
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
    } as any);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HistoriesService,
        {
          provide: getRepositoryToken(History),
          useValue: mockHistoryRepository(),
        },
      ],
    }).compile();

    service = module.get<HistoriesService>(HistoriesService);
    repository = module.get(getRepositoryToken(History));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save history record', async () => {
      const dto: CreateHistoryDto = {
        userId: 1,
        concertId: 2,
        action: 1,
      };

      const mockHistory = {
        id: 1,
        ...dto,
      } as History;

      repository.create.mockReturnValue(mockHistory);
      repository.save.mockResolvedValue(mockHistory);

      const result = await service.create(dto);

      expect(repository.create).toHaveBeenCalledWith({
        userId: 1,
        concertId: 2,
        action: 1,
      });
      expect(repository.save).toHaveBeenCalledWith(mockHistory);
      expect(result).toEqual(mockHistory);
    });
  });

  describe('findAll', () => {
    it('should return mapped histories', async () => {
      repository.find.mockResolvedValue([
        {
          id: 1,
          dateTime: new Date('2025-01-01'),
          action: 1,
          user: { name: 'Sara John' },
          concert: { name: 'Rock Night' },
        },
      ] as any);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalledWith({
        relations: ['user', 'concert'],
        withDeleted: true,
      });

      expect(result).toEqual([
        {
          id: 1,
          dateTime: new Date('2025-01-01'),
          action: 1,
          user: 'Sara John',
          concert: 'Rock Night',
        },
      ]);
    });
  });

  describe('findOne', () => {
    it('should return placeholder string', () => {
      const result = service.findOne(1);
      expect(result).toBe('This action returns a #1 history');
    });
  });

  describe('update', () => {
    it('should return placeholder string', () => {
      const result = service.update(1, { action: 0 });
      expect(result).toBe('This action updates a #1 history');
    });
  });

  describe('remove', () => {
    it('should return placeholder string', () => {
      const result = service.remove(1);
      expect(result).toBe('This action removes a #1 history');
    });
  });
});
