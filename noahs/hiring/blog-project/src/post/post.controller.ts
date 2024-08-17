/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  InternalServerErrorException,
  ParseIntPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from '../../src/common/types';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  // TODO: Implement the endpoint to create a post
  async createPost(@Body() data: CreatePostDto) {
    try {
      const post = await this.postService.createPost(data);
      return post;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get(':id')
  // TODO: Implement the endpoint to find a post by id
  async findPostById(@Param('id', ParseIntPipe) id: number) {
    try {
      const post = await this.postService.findPostById(id);
      if (!post) {
        return { message: 'Post not found' };
      }
      return post;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get()
  // TODO: Implement the endpoint to fetch all posts
  async getAllPosts() {
    try {
      const posts = await this.postService.getAllPosts();
      return posts;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
