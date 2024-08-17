import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { CreatePostDto } from '../../src/common/types';

describe('PostController', () => {
  let controller: PostController;
  let service: PostService;

  const mockPostService = {
    createPost: jest.fn(),
    findPostById: jest.fn(),
    getAllPosts: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [
        {
          provide: PostService,
          useValue: mockPostService,
        },
      ],
    }).compile();

    controller = module.get<PostController>(PostController);
    service = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createPost', () => {
    it('should create a post', async () => {
      const createPostDto: CreatePostDto = {
        title: 'Post Title',
        content: 'Post Content',
        authorId: 1,
      };

      const mockPost = { id: 1, ...createPostDto };
      mockPostService.createPost.mockResolvedValue(mockPost);

      const result = await controller.createPost(createPostDto);

      expect(result).toEqual(mockPost);
      expect(service.createPost).toHaveBeenCalledWith(createPostDto);
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

      mockPostService.findPostById.mockResolvedValue(mockPost);

      const result = await controller.findPostById(id);

      expect(result).toEqual(mockPost);
      expect(service.findPostById).toHaveBeenCalledWith(id);
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

      mockPostService.getAllPosts.mockResolvedValue(mockPosts);

      const result = await controller.getAllPosts();

      expect(result).toEqual(mockPosts);
      expect(service.getAllPosts).toHaveBeenCalled();
    });
  });
});
