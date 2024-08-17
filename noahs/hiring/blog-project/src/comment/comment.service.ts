/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { prisma } from '../../prisma/prisma.client';
import { CreateCommentDto } from '../../src/common/types';

@Injectable()
export class CommentService {
  constructor() {}

  // TODO: Implement the method to create a comment
  async createComment(data: CreateCommentDto) {
    try {
      const comment = await prisma.comment.create({ data: data });
      return comment;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // TODO: Implement the method to find comments by post id
  async findCommentsByPostId(postId: number) {
    try {
      const comments = await prisma.comment.findMany({
        where: { postId: postId },
      });
      return comments;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // TODO: Implement the method to fetch all comments
  async getAllComments() {
    try {
      const comments = await prisma.comment.findMany();
      return comments;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
