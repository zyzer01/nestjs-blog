import { SignInDto } from './dto/sign-in.dto';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-type.enum';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('sign-in')
  @Auth(AuthType.None)
  @HttpCode(HttpStatus.OK)
  public signIn(@Body() signInDto: SignInDto) {
    console.log('email' + signInDto.email);
    return this.authService.signIn(signInDto);
  }

  @Post('refresh-token')
  @Auth(AuthType.None)
  @HttpCode(HttpStatus.OK)
  public refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshTokens(refreshTokenDto);
  }
}
