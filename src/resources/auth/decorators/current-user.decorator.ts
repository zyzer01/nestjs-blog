import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ICurrentUser } from '../interfaces/current-user.interface';
import { REQUEST_USER_KEY } from 'src/constants/auth.constant';

export const CurrentUser = createParamDecorator(
  (data: keyof ICurrentUser | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: ICurrentUser = request[REQUEST_USER_KEY];

    return data ? user?.[data] : user;
  },
);
