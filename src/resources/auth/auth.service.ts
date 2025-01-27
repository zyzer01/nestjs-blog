import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RefreshTokensProvider } from './providers/refresh-tokens.provider';
import { SignInProvider } from './providers/sign-in.provider';
import { Injectable } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly signInProvider: SignInProvider,

    private readonly refreshTokensProvider: RefreshTokensProvider,
  ) {}

  public async signIn(signInDto: SignInDto) {
    return await this.signInProvider.signIn(signInDto);
  }

  public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    return await this.refreshTokensProvider.refreshTokens(refreshTokenDto);
  }

  public isAuth() {
    return true;
  }
}
