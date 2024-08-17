/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { prisma } from '../../prisma/prisma.client';
import { CreatePostDto } from '../../src/common/types';

@Injectable()
export class PostService {
  constructor() {}

  // TODO: Implement the method to create a post
  async createPost(data: CreatePostDto) {
    try {
      const post = await prisma.post.create({ data: data });
      return post;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // TODO: Implement the method to find a post by id
  async findPostById(id: number) {
    try {
      const post = await prisma.post.findUnique({ where: { id: id } });
      return post;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // TODO: Implement the method to fetch all posts
  async getAllPosts() {
    try {
      const posts = await prisma.post.findMany();
      return posts;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
