import { Test, TestingModule } from '@nestjs/testing';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CreateCommentDto } from '../../src/common/types';

describe('CommentController', () => {
  let controller: CommentController;
  let service: CommentService;

  const mockCommentService = {
    createComment: jest.fn(),
    findCommentsByPostId: jest.fn(),
    getAllComments: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentController],
      providers: [
        {
          provide: CommentService,
          useValue: mockCommentService,
        },
      ],
    }).compile();

    controller = module.get<CommentController>(CommentController);
    service = module.get<CommentService>(CommentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createComment', () => {
    it('should create a comment', async () => {
      const createCommentDto: CreateCommentDto = {
        content: 'Comment Content',
        postId: 1,
        userId: 1,
      };

      const mockComment = { id: 1, ...createCommentDto };
      mockCommentService.createComment.mockResolvedValue(mockComment);

      const result = await controller.createComment(createCommentDto);

      expect(result).toEqual(mockComment);
      expect(service.createComment).toHaveBeenCalledWith(createCommentDto);
    });
  });

  describe('findCommentsByPostId', () => {
    it('should find comments by post id', async () => {
      const postId = 1;
      const mockComments = [
        { id: 1, content: 'Comment Content 1', postId, userId: 1 },
        { id: 2, content: 'Comment Content 2', postId, userId: 2 },
      ];

      mockCommentService.findCommentsByPostId.mockResolvedValue(mockComments);

      const result = await controller.findCommentsByPostId(postId);

      expect(result).toEqual(mockComments);
      expect(service.findCommentsByPostId).toHaveBeenCalledWith(postId);
    });
  });

  describe('getAllComments', () => {
    it('should return all comments', async () => {
      const mockComments = [
        { id: 1, content: 'Comment Content 1', postId: 1, userId: 1 },
        { id: 2, content: 'Comment Content 2', postId: 2, userId: 2 },
      ];

      mockCommentService.getAllComments.mockResolvedValue(mockComments);

      const result = await controller.getAllComments();

      expect(result).toEqual(mockComments);
      expect(service.getAllComments).toHaveBeenCalled();
    });
  });
});
