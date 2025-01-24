import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './resources/user/user.module';
import { PostModule } from './resources/post/post.module';
import { AuthModule } from './resources/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './resources/user/user.entity';

@Module({
  imports: [
    UserModule,
    PostModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [User],
      inject: [],
      useFactory: () => ({
        type: 'postgres',
        entities: [],
        synchronize: true,
        host: 'localhost',
        username: 'zyzer01',
        password: '2426',
        database: 'nestjs-blog',
        port: 5432,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
