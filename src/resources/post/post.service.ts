import { CreatePostProvider } from './providers/create-post-provider';
import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UserService } from '../user/user.service';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TagService } from '../tag/tag.service';
import { ConfigService } from '@nestjs/config';
import { GetPostsDto } from './dto/get-posts.dto';
import { PaginationProvider } from 'src/common/pagination/provider/pagination.provider';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { ICurrentUser } from '../auth/interfaces/current-user.interface';

/**
 * Post Service (Manages all operations related to posts)
 */

@Injectable()
export class PostService {
  /**
   * Inject the user service
   */
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    private readonly configService: ConfigService,

    private readonly tagService: TagService,

    private readonly paginationProvider: PaginationProvider,

    private readonly userService: UserService,

    private readonly createPostProvider: CreatePostProvider,
  ) {}

  /**
   * Create a new post
   */
  public async create(createPostDto: CreatePostDto, user: ICurrentUser) {
    return await this.createPostProvider.create(createPostDto, user);
  }

  /**
   * Find all posts
   */
  public findAll(postquery: GetPostsDto): Promise<Paginated<Post>> {
    const env = this.configService.get('NODE_ENV');
    console.log(env);
    const posts = this.paginationProvider.paginateQuery(
      {
        limit: postquery.limit,
        page: postquery.page,
      },
      this.postRepository,
    );

    return posts;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  /**
   *
   * @param id
   * @param updatePostDto
   * @returns updated post
   */

  public async update(id: number, updatePostDto: UpdatePostDto) {
    let tags = undefined;
    let post = undefined;

    try {
      tags = await this.tagService.findMultipleTags(updatePostDto.tags);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment',
      );
    }
    try {
      post = await this.postRepository.findOneBy({ id: updatePostDto.id });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment',
      );
    }

    if (!tags || tags.length !== updatePostDto.tags.length) {
      throw new BadRequestException(
        'Please check the tag ids and ensure they are correct',
      );
    }

    if (!post) {
      throw new BadRequestException('A post with this id was not found');
    }

    post.title = updatePostDto.title ?? post.title;
    post.content = updatePostDto.content ?? post.content;
    post.featuredImage = updatePostDto.featuredImage ?? post.featuredImage;
    post.metaOptions = updatePostDto.metaOptions ?? post.metaOptions;
    post.postType = updatePostDto.postType ?? post.postType;
    // post.slug = updatePostDto.slug ?? post.slug;
    post.status = updatePostDto.status ?? post.status;

    post.tags = tags;

    try {
      await this.postRepository.save(post);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment',
      );
    }

    return post;
  }

  public async remove(id: number) {
    await this.postRepository.delete(id);

    return `This post with #${id} has been deleted`;
  }
}
