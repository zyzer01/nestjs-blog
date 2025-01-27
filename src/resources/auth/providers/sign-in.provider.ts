import {
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/resources/user/user.service';
import { HashingProvider } from './hashing.provider';
import { SignInDto } from '../dto/sign-in.dto';
import { GenerateAuthTokensProvider } from './generate-auth-tokens.provider';

@Injectable()
export class SignInProvider {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    private readonly hashingProvider: HashingProvider,

    private readonly generateAuthTokensProvider: GenerateAuthTokensProvider,
  ) {}
  public async signIn(signInDto: SignInDto) {
    const user = await this.userService.findOneByEmail(signInDto.email);

    let isEqual: boolean = false;

    try {
      isEqual = await this.hashingProvider.comparePassword(
        signInDto.password,
        user.password,
      );
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment',
        {
          description: String(error),
        },
      );
    }

    if (!isEqual) {
      throw new UnauthorizedException('Incorrect password');
    }

    return await this.generateAuthTokensProvider.generateTokens(user);
  }
}
