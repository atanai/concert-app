import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseSeedService } from './database.seed';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

describe('DatabaseSeedService', () => {
  let service: DatabaseSeedService;
  let usersRepository: jest.Mocked<Repository<User>>;

  const mockUsersRepository = (): Partial<jest.Mocked<Repository<User>>> => ({
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DatabaseSeedService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository(),
        },
      ],
    }).compile();

    service = module.get(DatabaseSeedService);
    usersRepository = module.get(getRepositoryToken(User));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should seed default user when user does not exist', async () => {
    usersRepository.findOne.mockResolvedValue(null);

    const userEntity = { id: 1, name: 'Sara John' } as User;
    usersRepository.create.mockReturnValue(userEntity);
    usersRepository.save.mockResolvedValue(userEntity);

    await service.onModuleInit();

    expect(usersRepository.findOne).toHaveBeenCalledWith({
      where: { name: 'Sara John' },
    });

    expect(usersRepository.create).toHaveBeenCalledWith({
      name: 'Sara John',
    });

    expect(usersRepository.save).toHaveBeenCalledWith(userEntity);
  });

  it('should NOT seed user if default user already exists', async () => {
    usersRepository.findOne.mockResolvedValue({
      id: 1,
      name: 'Sara John',
    } as User);

    await service.onModuleInit();

    expect(usersRepository.create).not.toHaveBeenCalled();
    expect(usersRepository.save).not.toHaveBeenCalled();
  });
});
