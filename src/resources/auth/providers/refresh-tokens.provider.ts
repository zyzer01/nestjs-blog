import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from 'src/config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { GenerateAuthTokensProvider } from './generate-auth-tokens.provider';
import { UserService } from 'src/resources/user/user.service';

@Injectable()
export class RefreshTokensProvider {
  constructor(
    private readonly jwtService: JwtService,

    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    private readonly generateAuthTokensProvider: GenerateAuthTokensProvider,
  ) {}

  public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    try {
      const { sub } = await this.jwtService.verifyAsync(
        refreshTokenDto.refreshToken,
        {
          secret: this.jwtConfiguration.secret,
          audience: this.jwtConfiguration.audience,
          issuer: this.jwtConfiguration.issuer,
        },
      );

      const user = await this.userService.findOneById(sub);

      return await this.generateAuthTokensProvider.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
