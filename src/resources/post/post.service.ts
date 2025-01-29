import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class PostService {
  constructor(
    /*
     * Injecting Users Service
     */
    private readonly userService: UserService,
  ) {}

  public findAll(userId: string) {
    const user = this.userService.findOneById(userId);

    return [
      {
        user: user,
        title: 'Test Tile',
        content: 'Test Content',
      },
      {
        user: user,
        title: 'Test Tile 2',
        content: 'Test Content 2',
      },
    ];
  }
}
