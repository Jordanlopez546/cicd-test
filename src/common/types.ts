export class CreateUserDto {
  email: string;
  name: string;
  password: string;
}
export class FindUserByEmailDto {
  email: string;
}
export class CreatePostDto {
  title: string;
  content: string;
  authorId: number;
}
export class CreateCommentDto {
  content: string;
  postId: number;
  userId: number;
}
export class FindCommentsByPostIdDto {
  postId: number;
}
