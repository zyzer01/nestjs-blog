import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { HashingProvider } from 'src/resources/auth/providers/hashing.provider';
import { MailService } from 'src/resources/mail/mail.service';

@Injectable()
export class CreateUserProvider {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,

    private readonly mailService: MailService,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    let existingUser = undefined;

    try {
      existingUser = await this.userRepository.findOne({
        where: {
          email: createUserDto.email,
        },
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment',
        {
          description: String(error),
        },
      );
    }

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    let newUser = await this.userRepository.create({
      ...createUserDto,
      password: await this.hashingProvider.hashPassword(createUserDto.password),
    });

    try {
      newUser = await this.userRepository.save(newUser);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment',
        {
          description: String(error),
        },
      );
    }

    try {
      await this.mailService.sendWelcomeEmail(newUser);
    } catch (error) {
      throw new RequestTimeoutException(error);
    }

    return newUser;
  }
}
