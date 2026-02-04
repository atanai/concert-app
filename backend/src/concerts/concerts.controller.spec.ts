import { Test, TestingModule } from '@nestjs/testing';
import { ConcertsController } from './concerts.controller';
import { ConcertsService } from './concerts.service';
import { CreateConcertDto } from './dto/create-concert.dto';
import { ReserveConcertDto } from './dto/reserve-concert.dto';
import { CancelConcertDto } from './dto/cancel-concert.dto';

describe('ConcertsController', () => {
  let controller: ConcertsController;
  let service: ConcertsService;

  const mockConcertsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    reserveSeat: jest.fn(),
    cancelSeat: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConcertsController],
      providers: [
        {
          provide: ConcertsService,
          useValue: mockConcertsService,
        },
      ],
    }).compile();

    controller = module.get<ConcertsController>(ConcertsController);
    service = module.get<ConcertsService>(ConcertsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a concert', async () => {
    const dto: CreateConcertDto = {
      name: 'Test Concert',
      description: 'Test Description',
      seats: 100,
      reservedSeats: [],
      cancelledSeats: [],
    };

    mockConcertsService.create.mockResolvedValue(dto);

    const result = await controller.create(dto);

    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(dto);
  });

  it('should return all concerts', async () => {
    const concerts = [{ id: 1, name: 'Concert A' }];

    mockConcertsService.findAll.mockResolvedValue(concerts);

    const result = await controller.findAll();

    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual(concerts);
  });

  it('should return one concert by id', async () => {
    const concert = { id: 1, name: 'Concert A' };

    mockConcertsService.findOne.mockResolvedValue(concert);

    const result = await controller.findOne('1');

    expect(service.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual(concert);
  });

  it('should reserve a seat', async () => {
    const dto: ReserveConcertDto = {
      userId: 1,
    };

    mockConcertsService.reserveSeat.mockResolvedValue({
      success: true,
    });

    const result = await controller.reserve('1', dto);

    expect(service.reserveSeat).toHaveBeenCalledWith(1, 1);
    expect(result).toEqual({ success: true });
  });

  it('should cancel a reservation', async () => {
    const dto: CancelConcertDto = {
      userId: 1,
    };

    mockConcertsService.cancelSeat.mockResolvedValue({
      success: true,
    });

    const result = await controller.cancel('1', dto);

    expect(service.cancelSeat).toHaveBeenCalledWith(1, 1);
    expect(result).toEqual({ success: true });
  });

  it('should remove a concert', async () => {
    mockConcertsService.remove.mockResolvedValue({ deleted: true });

    const result = await controller.remove('1');

    expect(service.remove).toHaveBeenCalledWith(1);
    expect(result).toEqual({ deleted: true });
  });
});
