import { FindOneUserByEmailProvider } from './providers/find-one-user-by-email.provider';
import { UserCreateManyProvider } from './providers/user-create-many.provider';
import { GetUserParamsDto } from './dto/get-user-params.dto';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateManyUsersDto } from './dto/create-many-users.dto';
import { CreateUserProvider } from './providers/create-user.provider';
import { FindOneByGoogleIdProvider } from './providers/find-one-by-google-id-provider';
import { CreateGoogleUserProvider } from './providers/create-google-user.provider';
import { IGoogleUser } from './interfaces/google-user.interface';
/**
 * User Service (Manages all operations related to users)
 */

@Injectable()
export class UserService {
  constructor(
    /**
     * Inject createManyUsers Provider
     */

    private readonly userCreateManyProvider: UserCreateManyProvider,

    /**
     * Inject createGoogleUser provider
     */

    private readonly createGoogleUserProvider: CreateGoogleUserProvider,

    /**
     * Inject createUser Provider
     */
    private readonly createUserProvider: CreateUserProvider,

    /**
     * Inject findByEmail Provider
     */
    private readonly findOneUserByEmailProvider: FindOneUserByEmailProvider,

    /**
     * Inject findByGoogleId Provider
     */
    private readonly findOneByGoogleIdProvider: FindOneByGoogleIdProvider,

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

  public async createGoogleUser(googleUser: IGoogleUser) {
    return await this.createGoogleUserProvider.createGoogleUser(googleUser);
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
   * @returns all users in the database
   */

  public async findAllUsers(
    getUserParamsDto: GetUserParamsDto,
    limit: number,
    page: number,
  ) {
    return await this.userRepository.find();
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

  public async findOneByGoogleId(googleId: string) {
    return await this.findOneByGoogleIdProvider.findOneByGoogleId(googleId);
  }
}
