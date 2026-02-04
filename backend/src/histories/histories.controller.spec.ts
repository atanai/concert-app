import { Test, TestingModule } from '@nestjs/testing';
import { HistoriesController } from './histories.controller';
import { HistoriesService } from './histories.service';

describe('HistoriesController', () => {
  let controller: HistoriesController;

  const mockHistoriesService = {
    findAll: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoriesController],
      providers: [
        {
          provide: HistoriesService,
          useValue: mockHistoriesService,
        },
      ],
    }).compile();

    controller = module.get<HistoriesController>(HistoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
