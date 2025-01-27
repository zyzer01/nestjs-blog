import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { TagService } from 'src/resources/tag/tag.service';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from '../dto/create-post.dto';
import { UserService } from 'src/resources/user/user.service';
import { ICurrentUser } from 'src/resources/auth/interfaces/current-user.interface';

@Injectable()
export class CreatePostProvider {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    private readonly userService: UserService,

    private readonly tagService: TagService,
  ) {}
  public async create(createPostDto: CreatePostDto, user: ICurrentUser) {
    let author = undefined;
    let tags = undefined;
    try {
      author = await this.userService.findOneById(user.sub);

      tags = await this.tagService.findMultipleTags(createPostDto.tags);
    } catch (error) {
      throw new ConflictException('Failed to create', {
        description: String(error),
      });
    }

    if (!tags || tags.length !== createPostDto.tags.length) {
      throw new BadRequestException(
        'Please check the tag ids and ensure they are correct',
      );
    }

    const post = this.postRepository.create({
      ...createPostDto,
      author,
      tags,
    });

    try {
      return await this.postRepository.save(post);
    } catch (error) {
      throw new ConflictException(error);
    }
  }
}
