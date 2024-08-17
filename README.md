# Blog Project Test

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test
```

## Objective

Complete the implementation of the given NestJS project. The project includes incomplete services and controllers for managing users, posts, and comments. Your task is to fill in the missing implementations and ensure the application works correctly with the provided Prisma schema.

## Instructions

1. **Set Up**:

   - Clone the repository.
   - Install the dependencies: `npm install`.
   - Set up the database: `npx prisma migrate dev`.

2. **Complete the Implementations**:

   - Implement the missing methods in `UserService`, `PostService`, and `CommentService`.
   - Implement the missing endpoints in `UserController`, `PostController`, and `CommentController`.

3. **Run the Application**:

   - Start the NestJS application: `npm run start:dev`.
   - Test the endpoints using Postman or Insomnia.

4. **Postman/Insomnia Testing**:

   - Create a collection in Postman or Insomnia to test all endpoints.
   - Ensure that your tests cover the following scenarios:
     - Create a user
     - Find a user by email
     - Fetch all users
     - Create a post
     - Find a post by id
     - Fetch all posts
     - Create a comment
     - Find comments by post id
     - Fetch all comments
   - Save the collection and export it to a file (Postman Collection `.json` or Insomnia Collection `.json`).

5. **Running Tests**:

   - Ensure all unit tests pass before submission.
   - To run the tests: `npm run test`.

6. **Submission**:
   - Ensure all tests pass and the application runs without errors.
   - Save your Postman/Insomnia collection file in the root of the project directory.
   - Submit the completed project by providing a link to the repository.

## Tasks

- [ ] Complete the `createUser` method in `UserService`.
- [ ] Complete the `findUserByEmail` method in `UserService`.
- [ ] Complete the `getAllUsers` method in `UserService`.
- [ ] Complete the `createPost` method in `PostService`.
- [ ] Complete the `findPostById` method in `PostService`.
- [ ] Complete the `getAllPosts` method in `PostService`.
- [ ] Complete the `createComment` method in `CommentService`.
- [ ] Complete the `findCommentsByPostId` method in `CommentService`.
- [ ] Complete the `getAllComments` method in `CommentService`.
- [ ] Implement the corresponding endpoints in `UserController`.
- [ ] Implement the corresponding endpoints in `PostController`.
- [ ] Implement the corresponding endpoints in `CommentController`.

## Notes

- Ensure you follow NestJS best practices.
- Use Prisma for database operations.
- Handle any potential errors appropriately.
- Use Postman or Insomnia to test all API endpoints and save your collection in the project.
- Ensure all tests pass by running `npm run test`.
- Run the application in development mode using `npm run start:dev`.
