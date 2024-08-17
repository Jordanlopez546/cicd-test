// src/user/user.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { prisma } from '../../prisma/prisma.client';
import { CreateUserDto } from '../../src/common/types';

// Mock Prisma Client
jest.mock('../../prisma/prisma.client', () => ({
  prisma: {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      };

      const mockUser = { id: 1, ...createUserDto };
      (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.createUser(createUserDto);

      expect(result).toEqual(mockUser);
      expect(prisma.user.create).toHaveBeenCalledWith({ data: createUserDto });
    });
  });

  describe('findUserByEmail', () => {
    it('should find a user by email', async () => {
      const email = 'john@example.com';
      const mockUser = {
        id: 1,
        name: 'John Doe',
        email,
        password: 'password123',
      };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.findUserByEmail(email);

      expect(result).toEqual(mockUser);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email } });
    });
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const mockUsers = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123',
        },
        {
          id: 2,
          name: 'Jane Doe',
          email: 'jane@example.com',
          password: 'password456',
        },
      ];

      (prisma.user.findMany as jest.Mock).mockResolvedValue(mockUsers);

      const result = await service.getAllUsers();

      expect(result).toEqual(mockUsers);
      expect(prisma.user.findMany).toHaveBeenCalled();
    });
  });
});
