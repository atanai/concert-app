import { Test, TestingModule } from '@nestjs/testing';
import { HistoriesController } from './histories.controller';
import { HistoriesService } from './histories.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';

describe('HistoriesController', () => {
  let controller: HistoriesController;
  let service: jest.Mocked<HistoriesService>;

  const mockHistoriesService = (): jest.Mocked<HistoriesService> => ({
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  } as any);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoriesController],
      providers: [
        {
          provide: HistoriesService,
          useValue: mockHistoriesService(),
        },
      ],
    }).compile();

    controller = module.get<HistoriesController>(HistoriesController);
    service = module.get(HistoriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call historiesService.create', async () => {
      const dto: CreateHistoryDto = {
        userId: 1,
        concertId: 2,
        action: 1,
      };

      service.create.mockResolvedValue({ id: 1 } as never);

      const result = await controller.create(dto);

      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual({ id: 1 });
    });
  });

  describe('findAll', () => {
    it('should return all histories', async () => {
      service.findAll.mockResolvedValue([{ id: 1 }] as never);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([{ id: 1 }]);
    });
  });

  describe('findOne', () => {
    it('should return a single history', async () => {
      service.findOne.mockResolvedValue({ id: 1 } as never);

      const result = await controller.findOne('1');

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual({ id: 1 });
    });
  });

  describe('update', () => {
    it('should update history', async () => {
      const dto: UpdateHistoryDto = { action: 0 };

      service.update.mockResolvedValue({ success: true } as never);

      const result = await controller.update('1', dto);

      expect(service.update).toHaveBeenCalledWith(1, dto);
      expect(result).toEqual({ success: true });
    });
  });

  describe('remove', () => {
    it('should remove history', async () => {
      service.remove.mockResolvedValue({ success: true } as never);

      const result = await controller.remove('1');

      expect(service.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual({ success: true });
    });
  });
});
