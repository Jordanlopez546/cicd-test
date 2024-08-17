/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { prisma } from '../../prisma/prisma.client';
import { CreateUserDto } from '../../src/common/types';

@Injectable()
export class UserService {
  constructor() {}

  // DONE: Implement the method to create a user
  async createUser({ name, email, password }: CreateUserDto) {
    try {
      const user = await prisma.user.create({
        data: { name, email, password },
      });
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // TODO: Implement the method to find a user by email
  async findUserByEmail(email: string) {
    try {
      const user = await prisma.user.findUnique({ where: { email: email } });
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // TODO: Implement the method to fetch all users
  async getAllUsers() {
    try {
      const users = await prisma.user.findMany();
      return users;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
