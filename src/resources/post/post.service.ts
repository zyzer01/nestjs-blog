import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UserService } from '../user/user.service';
import { UpdatePostDto } from './dto/update-post.dto';

/**
 * Post Service (Manages all operations related to posts)
 */

@Injectable()
export class PostService {
  /**
   * Inject the user service
   */
  constructor(private readonly userService: UserService) {}

  /**
   * Create a new post
   */
  create(createPostDto: CreatePostDto) {
    return 'This action adds a new post';
  }

  /**
   * Find all posts
   */
  public findAll(userId: string) {
    const user = this.userService.findOne(userId);
    console.log(user);
    return [
      {
        user: user,
        id: 1,
        title: 'Post 1',
        content: 'Content 1',
      },
      {
        user: user,
        id: 2,
        title: 'Post 2',
        content: 'Content 2',
      },
    ];
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  /**
   *
   * @param id
   * @param updatePostDto
   * @returns updated post
   */

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
