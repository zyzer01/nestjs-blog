import { SetMetadata } from '@nestjs/common';
import { AUTH_TYPE_KEY } from 'src/constants/auth.constant';
import { AuthType } from 'src/resources/auth/enums/auth-type.enum';

export const Auth = (...authTypes: AuthType[]) =>
  SetMetadata(AUTH_TYPE_KEY, authTypes);
