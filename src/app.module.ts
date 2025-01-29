import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './resources/auth/auth.module';
import { PostModule } from './resources/post/post.module';
import { UserModule } from './resources/user/user.module';

@Module({
  imports: [
    UserModule,
    PostModule,
    AuthModule,
    MongooseModule.forRoot(
      'mongodb+srv://nestjs:4kRbli2h2k5F50tb@nestjs.dgq4bvd.mongodb.net/?retryWrites=true&w=majority&appName=nestjs',
      { dbName: 'nestjs-blog' },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
