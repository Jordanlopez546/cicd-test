/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../../src/common/types';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  // TODO: Implement the endpoint to create a user
  async createUser(@Body() data: CreateUserDto) {
    try {
      const user = await this.userService.createUser(data);
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get(':email')
  // TODO: Implement the endpoint to find a user by email
  async findUserByEmail(@Param('email') email: string) {
    try {
      const user = await this.userService.findUserByEmail(email);
      if (!user) {
        return { message: 'User not found' }; // or throw a NotFoundException
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get()
  // TODO: Implement the endpoint to fetch all users
  async getAllUsers() {
    try {
      const users = await this.userService.getAllUsers();
      return users;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
