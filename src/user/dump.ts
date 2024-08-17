/*

  PLEASE DO NOT DELETE THIS FILE

*/

import { Test, TestingModule } from '@nestjs/testing';

import {
  AuthRequest,
  CreateUserRequest,
  DeleteUserRequest,
  GetUserRequest,
  UpdateUserRequest,
  UserResponse,
} from '@app/common/types/proto/user';
import { AuthResponse, LoginRequest, RefreshTokenRequest, RegisterRequest } from '@app/common/types/proto/auth';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { prismaTest } from '../../../libs/prisma';

describe('AuthController - createUser', () => {
  let authController: AuthController;
  let authService: AuthService;

  jest.mock('prisma', () => {
    return prismaTest;
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            createUser: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should create a user successfully', async () => {
    const request: CreateUserRequest = {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'Test@1234',
    };

    const mockUser = {
      id: '1',
      username: 'testuser',
      email: 'testuser@example.com',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    (authService.createUser as jest.Mock).mockResolvedValue({ user: mockUser });

    const result: UserResponse = await authController.createUser(request);
    expect(result.user).toEqual(mockUser);
    expect(authService.createUser).toHaveBeenCalledWith(request);
  });

  it('should throw an error if user creation fails', async () => {
    const request: CreateUserRequest = {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'Test@1234',
    };

    (authService.createUser as jest.Mock).mockRejectedValue(new Error('User creation failed'));

    await expect(authController.createUser(request)).rejects.toThrow('User creation failed');
    expect(authService.createUser).toHaveBeenCalledWith(request);
  });
});

describe('AuthController - getUserById', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            getUserById: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should get a user by id successfully', async () => {
    const userId = '1';
    const mockUser = {
      id: userId,
      username: 'testuser',
      email: 'testuser@example.com',
      role: 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    (authService.getUserById as jest.Mock).mockResolvedValue({
      user: mockUser,
    });

    const request: GetUserRequest = { id: userId };
    const result: UserResponse = await authController.getUserById(request);
    expect(result.user).toEqual(mockUser);
    expect(authService.getUserById).toHaveBeenCalledWith(request);
  });

  it('should throw an error if user does not exist', async () => {
    const userId = '999';

    (authService.getUserById as jest.Mock).mockRejectedValue(new Error('User not found'));

    const request: GetUserRequest = { id: userId };
    await expect(authController.getUserById(request)).rejects.toThrow('User not found');
    expect(authService.getUserById).toHaveBeenCalledWith(request);
  });
});

describe('AuthController - updateUser', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            updateUser: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should update a user successfully', async () => {
    const updateUserDto: UpdateUserRequest = {
      id: '1',
      username: 'updateduser',
      email: 'updateduser@example.com',
      password: 'Updated@1234',
    };

    const mockUpdatedUser = {
      id: '1',
      username: 'updateduser',
      email: 'updateduser@example.com',
      role: 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    (authService.updateUser as jest.Mock).mockResolvedValue({
      user: mockUpdatedUser,
    });

    const result: UserResponse = await authController.updateUser(updateUserDto);
    expect(result.user).toEqual(mockUpdatedUser);
    expect(authService.updateUser).toHaveBeenCalledWith(updateUserDto);
  });

  it('should throw an error if user to update is not found', async () => {
    const updateUserDto: UpdateUserRequest = {
      id: '999',
      username: 'updateduser',
      email: 'updateduser@example.com',
      password: 'Updated@1234',
    };

    (authService.updateUser as jest.Mock).mockRejectedValue(new Error('User update failed'));

    await expect(authController.updateUser(updateUserDto)).rejects.toThrow('User update failed');
    expect(authService.updateUser).toHaveBeenCalledWith(updateUserDto);
  });
});

describe('AuthController - deleteUser', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            deleteUser: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should delete a user successfully', async () => {
    const userId = '1';
    const request: DeleteUserRequest = { id: userId };

    (authService.deleteUser as jest.Mock).mockResolvedValue(undefined);

    await authController.deleteUser(request);
    expect(authService.deleteUser).toHaveBeenCalledWith(request);
  });

  it('should throw an error if user to delete is not found', async () => {
    const userId = '999';
    const request: DeleteUserRequest = { id: userId };

    (authService.deleteUser as jest.Mock).mockRejectedValue(new Error('User deletion failed'));

    await expect(authController.deleteUser(request)).rejects.toThrow('User deletion failed');
    expect(authService.deleteUser).toHaveBeenCalledWith(request);
  });
});

describe('AuthController - authenticateUser', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            authenticateUser: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should authenticate a user successfully', async () => {
    const authDto: AuthRequest = {
      email: 'testuser@example.com',
      password: 'Test@1234',
    };

    const mockAuthResponse: AuthResponse = {
      authToken: {
        accessToken: 'mockAccessToken',
        refreshToken: 'mockRefreshToken',
        expiresIn: 3600,
      },
    };

    (authService.authenticateUser as jest.Mock).mockResolvedValue(mockAuthResponse);

    const result: AuthResponse = await authController.authenticateUser(authDto);
    expect(result).toEqual(mockAuthResponse);
    expect(authService.authenticateUser).toHaveBeenCalledWith(authDto);
  });

  it('should throw an error if user authentication fails', async () => {
    const authDto: AuthRequest = {
      email: 'testuser@example.com',
      password: 'WrongPassword',
    };

    (authService.authenticateUser as jest.Mock).mockRejectedValue(new Error('Invalid credentials'));

    await expect(authController.authenticateUser(authDto)).rejects.toThrow('Invalid credentials');
    expect(authService.authenticateUser).toHaveBeenCalledWith(authDto);
  });
});

describe('AuthController - login', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should log in a user successfully', async () => {
    const loginDto: LoginRequest = {
      email: 'testuser@example.com',
      password: 'Test@1234',
    };

    const mockAuthResponse: AuthResponse = {
      authToken: {
        accessToken: 'mockAccessToken',
        refreshToken: 'mockRefreshToken',
        expiresIn: 3600,
      },
    };

    (authService.login as jest.Mock).mockResolvedValue(mockAuthResponse);

    const result: AuthResponse = await authController.login(loginDto);
    expect(result).toEqual(mockAuthResponse);
    expect(authService.login).toHaveBeenCalledWith(loginDto);
  });

  it('should throw an error if login credentials are invalid', async () => {
    const loginDto: LoginRequest = {
      email: 'testuser@example.com',
      password: 'WrongPassword',
    };

    (authService.login as jest.Mock).mockRejectedValue(new Error('Invalid credentials'));

    await expect(authController.login(loginDto)).rejects.toThrow('Invalid credentials');
    expect(authService.login).toHaveBeenCalledWith(loginDto);
  });
});

describe('AuthController - register', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should register a new user successfully', async () => {
    const registerDto: RegisterRequest = {
      username: 'newuser',
      email: 'newuser@example.com',
      password: 'NewUser@1234',
    };

    const mockUserResponse: UserResponse = {
      user: {
        id: '1',
        username: 'newuser',
        email: 'newuser@example.com',
        role: 'user',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        password: '',
      },
    };

    (authService.register as jest.Mock).mockResolvedValue(mockUserResponse);

    const result: UserResponse = await authController.register(registerDto);
    expect(result).toEqual(mockUserResponse);
    expect(authService.register).toHaveBeenCalledWith(registerDto);
  });

  it('should throw an error if registration fails', async () => {
    const registerDto: RegisterRequest = {
      username: 'newuser',
      email: 'newuser@example.com',
      password: 'NewUser@1234',
    };

    (authService.register as jest.Mock).mockRejectedValue(new Error('User registration failed'));

    await expect(authController.register(registerDto)).rejects.toThrow('User registration failed');
    expect(authService.register).toHaveBeenCalledWith(registerDto);
  });
});

describe('AuthController - refreshToken', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            refreshToken: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should refresh access token successfully', async () => {
    const refreshTokenDto: RefreshTokenRequest = {
      refreshToken: 'mockRefreshToken',
    };

    const mockAuthResponse: AuthResponse = {
      authToken: {
        accessToken: 'newAccessToken',
        refreshToken: 'newRefreshToken',
        expiresIn: 3600,
      },
    };

    (authService.refreshToken as jest.Mock).mockResolvedValue(mockAuthResponse);

    const result: AuthResponse = await authController.refreshToken(refreshTokenDto);
    expect(result).toEqual(mockAuthResponse);
    expect(authService.refreshToken).toHaveBeenCalledWith(refreshTokenDto);
  });

  it('should throw an error if refresh token is invalid', async () => {
    const refreshTokenDto: RefreshTokenRequest = {
      refreshToken: 'invalidRefreshToken',
    };

    (authService.refreshToken as jest.Mock).mockRejectedValue(new Error('Invalid refresh token'));

    await expect(authController.refreshToken(refreshTokenDto)).rejects.toThrow('Invalid refresh token');
    expect(authService.refreshToken).toHaveBeenCalledWith(refreshTokenDto);
  });
});

describe('AuthController - refreshToken', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            refreshToken: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should refresh access token successfully', async () => {
    const refreshTokenDto: RefreshTokenRequest = {
      refreshToken: 'mockRefreshToken',
    };

    const mockAuthResponse: AuthResponse = {
      authToken: {
        accessToken: 'newAccessToken',
        refreshToken: 'newRefreshToken',
        expiresIn: 3600,
      },
    };

    (authService.refreshToken as jest.Mock).mockResolvedValue(mockAuthResponse);

    const result: AuthResponse = await authController.refreshToken(refreshTokenDto);
    expect(result).toEqual(mockAuthResponse);
    expect(authService.refreshToken).toHaveBeenCalledWith(refreshTokenDto);
  });

  it('should throw an error if refresh token is invalid', async () => {
    const refreshTokenDto: RefreshTokenRequest = {
      refreshToken: 'invalidRefreshToken',
    };

    (authService.refreshToken as jest.Mock).mockRejectedValue(new Error('Invalid refresh token'));

    await expect(authController.refreshToken(refreshTokenDto)).rejects.toThrow('Invalid refresh token');
    expect(authService.refreshToken).toHaveBeenCalledWith(refreshTokenDto);
  });
});
