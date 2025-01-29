import { Controller, Get, Param, Patch, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostService } from '../post/post.service';
import { CreatePostDto } from '../post/dto/create-post.dto';
import { UpdatePostDto } from '../post/dto/update-post.dto';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(
    /*
     *  Injecting Posts Service
     */
    private readonly postService: PostService,
  ) {}

  /*
   * GET localhost:3000/posts/:userId
   */
  @Get('/:userId?')
  public getPosts(@Param('userId') userId: string) {
    return this.postService.findAll(userId);
  }

  @ApiOperation({
    summary: 'Creates a new post for the blog.',
  })
  @ApiResponse({
    status: 201,
    description:
      'You get a success 201 response if the post is created successfully',
  })
  @Post()
  public createPost(@Body() createPostDto: CreatePostDto) {
    console.log(createPostDto);
  }

  @ApiOperation({
    summary: 'Updates and existing blog post in the database.',
  })
  @ApiResponse({
    status: 200,
    description:
      'You get a success 20o response if the post is updated successfully',
  })
  @Patch()
  public updatePost(@Body() patchPostsDto: UpdatePostDto) {
    console.log(patchPostsDto);
  }
}
