// src/user/user.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from '../../src/common/types';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUserService = {
    createUser: jest.fn(),
    findUserByEmail: jest.fn(),
    getAllUsers: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      };

      const mockUser = { id: 1, ...createUserDto };
      mockUserService.createUser.mockResolvedValue(mockUser);

      const result = await controller.createUser(createUserDto);

      expect(result).toEqual(mockUser);
      expect(service.createUser).toHaveBeenCalledWith(createUserDto);
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

      mockUserService.findUserByEmail.mockResolvedValue(mockUser);

      const result = await controller.findUserByEmail(email);

      expect(result).toEqual(mockUser);
      expect(service.findUserByEmail).toHaveBeenCalledWith(email);
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

      mockUserService.getAllUsers.mockResolvedValue(mockUsers);

      const result = await controller.getAllUsers();

      expect(result).toEqual(mockUsers);
      expect(service.getAllUsers).toHaveBeenCalled();
    });
  });
});
