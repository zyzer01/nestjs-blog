import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
  imports: [forwardRef(() => AuthModule)],
})
export class UserModule {}
