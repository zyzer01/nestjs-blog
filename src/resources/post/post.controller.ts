import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description:
      'You get a 201 response status if blog post is created successfully',
    type: CreatePostDto,
  })
  @ApiOperation({ summary: 'Create a new blog post' })
  create(@Body() createPostDto: CreatePostDto) {
    console.log(createPostDto);
    return this.postService.create(createPostDto);
  }

  // @Get()
  // findAll() {
  //   return this.postService.findAll();
  // }

  @Get('/:userId')
  findOne(@Param('userId') userId?: string) {
    return this.postService.findAll();
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Patch('/:id')
  @ApiResponse({
    status: 200,
    description:
      'You get a 200 response status if blog post was updated successfully',
    type: CreatePostDto,
  })
  @ApiOperation({ summary: 'Updates a blog post' })
  update(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto) {
    console.log(updatePostDto);
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postService.remove(id);
  }
}
