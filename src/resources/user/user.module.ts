import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserCreateManyProvider } from './provider/user-create-many.provider';

@Module({
  controllers: [UserController],
  providers: [UserService, UserCreateManyProvider],
  exports: [UserService],
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([User])],
})
export class UserModule {}
