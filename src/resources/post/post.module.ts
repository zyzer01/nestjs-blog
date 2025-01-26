import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { TagModule } from '../tag/tag.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';

@Module({
  imports: [
    UserModule,
    TagModule,
    PaginationModule,
    TypeOrmModule.forFeature([Post]),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
