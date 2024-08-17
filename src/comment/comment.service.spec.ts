// src/comment/comment.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { CommentService } from './comment.service';
import { prisma } from '../../prisma/prisma.client';
import { CreateCommentDto } from '../../src/common/types';

// Mock Prisma Client
jest.mock('../../prisma/prisma.client', () => ({
  prisma: {
    comment: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

describe('CommentService', () => {
  let service: CommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentService],
    }).compile();

    service = module.get<CommentService>(CommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createComment', () => {
    it('should create a comment', async () => {
      const createCommentDto: CreateCommentDto = {
        content: 'Comment Content',
        postId: 1,
        userId: 1,
      };

      const mockComment = { id: 1, ...createCommentDto };
      (prisma.comment.create as jest.Mock).mockResolvedValue(mockComment);

      const result = await service.createComment(createCommentDto);

      expect(result).toEqual(mockComment);
      expect(prisma.comment.create).toHaveBeenCalledWith({
        data: createCommentDto,
      });
    });
  });

  describe('findCommentsByPostId', () => {
    it('should find comments by post id', async () => {
      const postId = 1;
      const mockComments = [
        { id: 1, content: 'Comment Content 1', postId, userId: 1 },
        { id: 2, content: 'Comment Content 2', postId, userId: 2 },
      ];

      (prisma.comment.findMany as jest.Mock).mockResolvedValue(mockComments);

      const result = await service.findCommentsByPostId(postId);

      expect(result).toEqual(mockComments);
      expect(prisma.comment.findMany).toHaveBeenCalledWith({
        where: { postId },
      });
    });
  });

  describe('getAllComments', () => {
    it('should return all comments', async () => {
      const mockComments = [
        { id: 1, content: 'Comment Content 1', postId: 1, userId: 1 },
        { id: 2, content: 'Comment Content 2', postId: 2, userId: 2 },
      ];

      (prisma.comment.findMany as jest.Mock).mockResolvedValue(mockComments);

      const result = await service.getAllComments();

      expect(result).toEqual(mockComments);
      expect(prisma.comment.findMany).toHaveBeenCalled();
    });
  });
});
