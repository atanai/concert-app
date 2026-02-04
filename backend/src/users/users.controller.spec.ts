import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: jest.Mocked<UsersService>;

  const mockUsersService = (): jest.Mocked<UsersService> =>
    ({
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    } as any);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService(),
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call usersService.create', async () => {
      const dto: CreateUserDto = { name: 'Sara John' };

      service.create.mockResolvedValue({ id: 1, name: 'Sara John' } as never);

      const result = await controller.create(dto);

      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual({ id: 1, name: 'Sara John' });
    });
  });

  describe('findAll', () => {
    it('should return users list', async () => {
      const users = [{ id: 1, name: 'Sara John' }];

      service.findAll.mockResolvedValue(users as never);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(users);
    });
  });

  describe('findOne', () => {
    it('should call usersService.findOne with number id', async () => {
      service.findOne.mockResolvedValue({ id: 1, name: 'Sara John' } as never);

      const result = await controller.findOne('1');

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual({ id: 1, name: 'Sara John' });
    });
  });

  describe('update', () => {
    it('should call usersService.update', async () => {
      const dto: UpdateUserDto = { name: 'Updated Name' };

      service.update.mockResolvedValue({ id: 1, name: 'Updated Name' } as never);

      const result = await controller.update('1', dto);

      expect(service.update).toHaveBeenCalledWith(1, dto);
      expect(result).toEqual({ id: 1, name: 'Updated Name' });
    });
  });

  describe('remove', () => {
    it('should call usersService.remove', async () => {
      service.remove.mockResolvedValue({ success: true } as never);

      const result = await controller.remove('1');

      expect(service.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual({ success: true });
    });
  });
});
