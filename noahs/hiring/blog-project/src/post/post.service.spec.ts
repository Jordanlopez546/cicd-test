// src/post/post.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { prisma } from '../../prisma/prisma.client';
import { CreatePostDto } from '../../src/common/types';

// Mock Prisma Client
jest.mock('../../prisma/prisma.client', () => ({
  prisma: {
    post: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

describe('PostService', () => {
  let service: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostService],
    }).compile();

    service = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createPost', () => {
    it('should create a post', async () => {
      const createPostDto: CreatePostDto = {
        title: 'Post Title',
        content: 'Post Content',
        authorId: 1,
      };

      const mockPost = { id: 1, ...createPostDto };
      (prisma.post.create as jest.Mock).mockResolvedValue(mockPost);

      const result = await service.createPost(createPostDto);

      expect(result).toEqual(mockPost);
      expect(prisma.post.create).toHaveBeenCalledWith({ data: createPostDto });
    });
  });

  describe('findPostById', () => {
    it('should find a post by id', async () => {
      const id = 1;
      const mockPost = {
        id,
        title: 'Post Title',
        content: 'Post Content',
        authorId: 1,
      };

      (prisma.post.findUnique as jest.Mock).mockResolvedValue(mockPost);

      const result = await service.findPostById(id);

      expect(result).toEqual(mockPost);
      expect(prisma.post.findUnique).toHaveBeenCalledWith({ where: { id } });
    });
  });

  describe('getAllPosts', () => {
    it('should return all posts', async () => {
      const mockPosts = [
        {
          id: 1,
          title: 'Post Title 1',
          content: 'Post Content 1',
          authorId: 1,
        },
        {
          id: 2,
          title: 'Post Title 2',
          content: 'Post Content 2',
          authorId: 2,
        },
      ];

      (prisma.post.findMany as jest.Mock).mockResolvedValue(mockPosts);

      const result = await service.getAllPosts();

      expect(result).toEqual(mockPosts);
      expect(prisma.post.findMany).toHaveBeenCalled();
    });
  });
});
