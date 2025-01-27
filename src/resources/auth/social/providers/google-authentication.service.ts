import { forwardRef, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/config/jwt.config';
import { GoogleTokenDto } from '../dto/google-token.dto';
import { UserService } from 'src/resources/user/user.service';
import { GenerateAuthTokensProvider } from '../../providers/generate-auth-tokens.provider';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  private oauthClient: OAuth2Client;

  constructor(
    /**
     * Inject user service
     */
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    /**
     * Inject generateTokenProvider
     */
    private readonly generateAuthTokensProvider: GenerateAuthTokensProvider,

    /**
     * Inject jwt service
     */
    private readonly jwtService: JwtService,

    /**
     * Inject jwt configuration
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  onModuleInit() {
    const clientId = this.jwtConfiguration.googleClientId;
    const clientSecret = this.jwtConfiguration.googleClientSecret;
    this.oauthClient = new OAuth2Client(clientId, clientSecret);
  }

  public async authenticate(googleTokenDto: GoogleTokenDto) {
    const loginTicket = await this.oauthClient.verifyIdToken({
      idToken: googleTokenDto.token,
    });

    const {
      email,
      given_name: firstName,
      family_name: lastName,
      sub: googleId,
    } = loginTicket.getPayload();

    const user = await this.userService.findOneByGoogleId(googleId);

    if (user) {
      return await this.generateAuthTokensProvider.generateTokens(user);
    }
  }
}
