import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  public login(email: string, password: string) {
    const user = this.userService.findOne(email);
    console.log(user);

    return 'TOKEN';
  }

  public isAuth() {
    return true;
  }
}
