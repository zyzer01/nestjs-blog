import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    // Injecting UserService
    @Inject(forwardRef(() => UserService))
    private readonly usersService: UserService,
  ) {}

  public login(email: string, password: string, id: string) {
    const user = this.usersService.findOneById('1234');
    // login
    return 'SAMPLE_TOKEN';
  }

  public isAuth() {
    return true;
  }
}