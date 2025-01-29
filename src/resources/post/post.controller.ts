import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetPostsDto } from './dto/get-posts.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ICurrentUser } from '../auth/interfaces/current-user.interface';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  // @Post()
  // @ApiResponse({
  //   status: 201,
  //   description:
  //     'You get a 201 response status if blog post is created successfully',
  //   type: CreatePostDto,
  // })
  // @ApiOperation({ summary: 'Create a new blog post' })
  // create(
  //   @Body() createPostDto: CreatePostDto,
  //   @CurrentUser('sub') currentUser: ICurrentUser,
  // ) {
  //   console.log(currentUser);
  //   return this.postService.create(createPostDto, currentUser);
  // }

  // // @Get()
  // // findAll() {
  // //   return this.postService.findAll();
  // // }

  // @Get()
  // findOne(@Query() postquery?: GetPostsDto) {
  //   return this.postService.findAll(postquery);
  // }

  // // @Get()
  // // findAll() {
  // //   return this.postService.findAll();
  // // }

  // @Patch('/:id')
  // @ApiResponse({
  //   status: 200,
  //   description:
  //     'You get a 200 response status if blog post was updated successfully',
  //   type: CreatePostDto,
  // })
  // @ApiOperation({ summary: 'Updates a blog post' })
  // update(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto) {
  //   console.log(updatePostDto);
  //   return this.postService.update(id, updatePostDto);
  // }

  // @Delete(':id')
  // remove(@Param('id', ParseIntPipe) id: number) {
  //   return this.postService.remove(id);
  // }
}
