import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UserService } from '../user/user.service';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TagService } from '../tag/tag.service';
import { ConfigService } from '@nestjs/config';

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

    private readonly userService: UserService,
  ) {}

  /**
   * Create a new post
   */
  public async create(createPostDto: CreatePostDto) {
    const author = await this.userService.findOneById(createPostDto.authorId);

    const tags = await this.tagService.findMultipleTags(createPostDto.tags);

    const post = this.postRepository.create({
      ...createPostDto,
      author,
      tags,
    });

    return this.postRepository.save(post);
  }

  /**
   * Find all posts
   */
  public findAll() {
    const env = this.configService.get('NODE_ENV');
    console.log(env);
    const posts = this.postRepository.find({
      relations: ['metaOptions', 'author', 'tags'],
    });

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
    const tags = await this.tagService.findMultipleTags(updatePostDto.tags);

    const post = await this.postRepository.findOneBy({ id: updatePostDto.id });

    post.title = updatePostDto.title ?? post.title;
    post.content = updatePostDto.content ?? post.content;
    post.featuredImage = updatePostDto.featuredImage ?? post.featuredImage;
    post.metaOptions = updatePostDto.metaOptions ?? post.metaOptions;
    post.postType = updatePostDto.postType ?? post.postType;
    // post.slug = updatePostDto.slug ?? post.slug;
    post.status = updatePostDto.status ?? post.status;

    post.tags = tags;

    return await this.postRepository.save(post);
  }

  public async remove(id: number) {
    await this.postRepository.delete(id);

    return `This post with #${id} has been deleted`;
  }
}
