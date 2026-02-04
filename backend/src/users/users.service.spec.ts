import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return create message', () => {
      const dto: CreateUserDto = { name: 'Sara John' };

      const result = service.create(dto);

      expect(result).toBe('This action adds a new user');
    });
  });

  describe('findAll', () => {
    it('should return find all message', () => {
      const result = service.findAll();

      expect(result).toBe('This action returns all users');
    });
  });

  describe('findOne', () => {
    it('should return find one message with id', () => {
      const result = service.findOne(1);

      expect(result).toBe('This action returns a #1 user');
    });
  });

  describe('update', () => {
    it('should return update message with id', () => {
      const dto: UpdateUserDto = { name: 'Updated Name' };

      const result = service.update(1, dto);

      expect(result).toBe('This action updates a #1 user');
    });
  });

  describe('remove', () => {
    it('should return remove message with id', () => {
      const result = service.remove(1);

      expect(result).toBe('This action removes a #1 user');
    });
  });
});
