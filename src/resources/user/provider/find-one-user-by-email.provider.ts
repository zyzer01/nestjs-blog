import {
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindOneUserByEmailProvider {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async findOneByEmail(email: string) {
    let user: User | undefined = undefined;

    try {
      user = await this.userRepository.findOneBy({
        email: email,
      });

      if (!user) {
        throw new UnauthorizedException('User does not exist');
      }
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to complete this operation at this time',
        {
          description: String(error),
        },
      );
    }
    return user;
  }
}
