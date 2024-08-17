/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  InternalServerErrorException,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from '../../src/common/types';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  // TODO: Implement the endpoint to create a comment
  async createComment(@Body() data: CreateCommentDto) {
    try {
      const comment = await this.commentService.createComment(data);
      return comment;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get('post/:postId')
  // TODO: Implement the endpoint to find comments by post id
  async findCommentsByPostId(@Param('postId', ParseIntPipe) postId: number) {
    try {
      const comments = await this.commentService.findCommentsByPostId(postId);
      return comments;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get()
  // TODO: Implement the endpoint to fetch all comments
  async getAllComments() {
    try {
      const comments = await this.commentService.getAllComments();
      return comments;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
