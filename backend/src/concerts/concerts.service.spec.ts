import { Test, TestingModule } from '@nestjs/testing';
import { ConcertsService } from './concerts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Concert } from './entities/concert.entity';
import { Repository, QueryFailedError } from 'typeorm';
import { HistoriesService } from 'src/histories/histories.service';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

describe('ConcertsService', () => {
  let service: ConcertsService;
  let repo: jest.Mocked<Repository<Concert>>;
  let historiesService: jest.Mocked<HistoriesService>;

  const mockRepo = (): Partial<jest.Mocked<Repository<Concert>>> => ({
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    softDelete: jest.fn(),
  });

  const mockHistoriesService = (): Partial<jest.Mocked<HistoriesService>> => ({
    create: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConcertsService,
        {
          provide: getRepositoryToken(Concert),
          useValue: mockRepo(),
        },
        {
          provide: HistoriesService,
          useValue: mockHistoriesService(),
        },
      ],
    }).compile();

    service = module.get(ConcertsService);
    repo = module.get(getRepositoryToken(Concert));
    historiesService = module.get(HistoriesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // ---------------- CREATE ----------------
  describe('create', () => {
    it('should create concert successfully', async () => {
      const dto = { name: 'Rock Fest', seats: 2 };
      const entity = { id: 1, ...dto };

      repo.create.mockReturnValue(entity as Concert);
      repo.save.mockResolvedValue(entity as Concert);

      const result = await service.create(dto as any);
      expect(result).toEqual(entity);
    });

    it('should throw duplicate name error (23505)', async () => {
      repo.create.mockReturnValue({} as Concert);
      repo.save.mockRejectedValue(
        Object.assign(new QueryFailedError('', [], new Error()), {
          code: '23505',
        }),
      );

      await expect(service.create({} as any)).rejects.toThrow(
        new BadRequestException('Concert name already exists'),
      );
    });

    it('should throw missing field error (23502)', async () => {
      repo.create.mockReturnValue({} as Concert);
      repo.save.mockRejectedValue(
        Object.assign(new QueryFailedError('', [], new Error()), {
          code: '23502',
        }),
      );

      await expect(service.create({} as any)).rejects.toThrow(
        new BadRequestException('Missing required field'),
      );
    });

    it('should throw internal server error for unknown error', async () => {
      repo.create.mockReturnValue({} as Concert);
      repo.save.mockRejectedValue(new Error());

      await expect(service.create({} as any)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  // ---------------- FIND ALL ----------------
  describe('findAll', () => {
    it('should return all concerts', async () => {
      repo.find.mockResolvedValue([{ id: 1 }] as Concert[]);
      const result = await service.findAll();
      expect(result).toHaveLength(1);
    });
  });

  // ---------------- REMOVE ----------------
  describe('remove', () => {
    it('should remove concert successfully', async () => {
      repo.findOneBy.mockResolvedValue({ id: 1 } as Concert);

      const result = await service.remove(1);
      expect(repo.softDelete).toHaveBeenCalledWith(1);
      expect(result).toEqual({ success: true });
    });

    it('should throw not found if concert does not exist', async () => {
      repo.findOneBy.mockResolvedValue(null);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });

  // ---------------- RESERVE ----------------
  describe('reserveSeat', () => {
    const concert = {
      id: 1,
      seats: 2,
      reservedSeats: [],
      cancelledSeats: [],
    } as Concert;

    it('should reserve seat successfully', async () => {
      repo.findOne.mockResolvedValue(concert);
      repo.save.mockResolvedValue(concert);

      const result = await service.reserveSeat(1, 10);

      expect(historiesService.create).toHaveBeenCalledWith({
        userId: 10,
        concertId: 1,
        action: 1,
      });
      expect(result.reservedSeats).toContain(10);
    });

    it('should throw if concert not found', async () => {
      repo.findOne.mockResolvedValue(null);

      await expect(service.reserveSeat(1, 10)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw if already reserved', async () => {
      repo.findOne.mockResolvedValue({
        ...concert,
        reservedSeats: [10],
      } as Concert);

      await expect(service.reserveSeat(1, 10)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw if concert is full', async () => {
      repo.findOne.mockResolvedValue({
        ...concert,
        reservedSeats: [1, 2],
      } as Concert);

      await expect(service.reserveSeat(1, 10)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  // ---------------- CANCEL ----------------
  describe('cancelSeat', () => {
    const concert = {
      id: 1,
      reservedSeats: [10],
      cancelledSeats: [],
    } as Concert;

    it('should cancel seat successfully', async () => {
      repo.findOne.mockResolvedValue(concert);
      repo.save.mockResolvedValue(concert);

      const result = await service.cancelSeat(1, 10);

      expect(historiesService.create).toHaveBeenCalledWith({
        userId: 10,
        concertId: 1,
        action: 0,
      });
      expect(result.reservedSeats).not.toContain(10);
      expect(result.cancelledSeats).toContain(10);
    });

    it('should throw if concert not found', async () => {
      repo.findOne.mockResolvedValue(null);

      await expect(service.cancelSeat(1, 10)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw if not reserved', async () => {
      repo.findOne.mockResolvedValue({
        ...concert,
        reservedSeats: [],
      } as Concert);

      await expect(service.cancelSeat(1, 10)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
