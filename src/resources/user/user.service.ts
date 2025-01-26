import { GetUserParamsDto } from './dto/get-user-params.dto';
import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from '../auth/auth.service';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
/**
 * User Service (Manages all operations related to users)
 */

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   *
   * @param createUserDto
   * @returns
   */

  public async createUser(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    let newUser = await this.userRepository.create(createUserDto);

    newUser = await this.userRepository.save(newUser);

    return newUser;
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

  public async findOneById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }
}
