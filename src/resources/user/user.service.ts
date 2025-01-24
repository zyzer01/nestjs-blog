import { GetUserParamsDto } from './dto/get-user-params.dto';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from '../auth/auth.service';

/**
 * User Service (Manages all operations related to users)
 */

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  /**
   *
   * @param createUserDto
   * @returns
   */

  createUser(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  /**
   *
   * @returns all users
   */

  getUsers(): string {
    return 'My users';
  }

  /**
   *
   * @param id
   * @returns all users in the database
   */

  public findAll(
    getUserParamsDto: GetUserParamsDto,
    limit: number,
    page: number,
  ) {
    const isAuth = this.authService.isAuth();
    console.log(isAuth);
    return [
      {
        id: 1,
        name: 'John Doe',
        age: 25,
      },
      {
        id: 2,
        name: 'Jane Doe',
        age: 26,
      },
      {
        id: 3,
        name: 'Alice',
        age: 30,
      },
    ];
  }

  /**
   *
   * @param id
   * @returns a single user
   */

  public findOne(id: string) {
    return {
      id: 1,
      name: 'John Doe',
      age: 25,
    };
  }
}
