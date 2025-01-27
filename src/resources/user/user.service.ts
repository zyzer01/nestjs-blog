import { FindOneUserByEmailProvider } from './provider/find-one-user-by-email.provider';
import { UserCreateManyProvider } from './provider/user-create-many.provider';
import { GetUserParamsDto } from './dto/get-user-params.dto';
import {
  BadRequestException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from '../auth/auth.service';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateManyUsersDto } from './dto/create-many-users.dto';
import { CreateUserProvider } from './provider/create-user.provider';
/**
 * User Service (Manages all operations related to users)
 */

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    /**
     * Inject createManyUsers Provider
     */

    private readonly userCreateManyProvider: UserCreateManyProvider,

    /**
     * Inject createUser Provider
     */
    private readonly createUserProvider: CreateUserProvider,

    private readonly findOneUserByEmailProvider: FindOneUserByEmailProvider,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   *
   * @param createUserDto
   * @returns
   */

  public async createUser(createUserDto: CreateUserDto) {
    return this.createUserProvider.createUser(createUserDto);
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
    throw new HttpException(
      {
        status: HttpStatus.MOVED_PERMANENTLY,
        error: 'The api endpoint does not exist',
        file: 'user.service.ts',
        linNumber: 88,
      },
      HttpStatus.MOVED_PERMANENTLY,
      {
        cause: new Error(),
        description: 'Occured because api endoint was moved',
      },
    );
  }

  /**
   *
   * @param id
   * @returns a single user
   */

  public async findOneById(id: number) {
    let user = undefined;
    try {
      user = await this.userRepository.findOneBy({ id });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment',
        {
          description: String(error),
        },
      );
    }

    if (!user) {
      throw new BadRequestException('User with this id was not found');
    }
    return user;
  }

  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    return await this.userCreateManyProvider.createMany(createManyUsersDto);
  }

  public async findOneByEmail(email: string) {
    return await this.findOneUserByEmailProvider.findOneByEmail(email);
  }
}
