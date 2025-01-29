import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { UserModule } from '../user/user.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';

@Module({
  imports: [UserModule, PaginationModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
