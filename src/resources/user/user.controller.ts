import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserParamsDto } from './dto/get-user-params.dto';
import { PatchUserDto } from './dto/patch-user.dto';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateManyUsersDto } from './dto/create-many-users.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post('create-many')
  public createManyUsers(@Body() createManyUsersDto: CreateManyUsersDto) {
    return this.userService.createMany(createManyUsersDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get a user by their id',
  })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully retrieved.',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Limit the number of users',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Specify the page number',
    example: 1,
  })
  getUsers(
    @Param() getUserParamsDto: GetUserParamsDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.userService.findAll(getUserParamsDto, limit, page);
  }

  @Patch('/:id')
  patchUser(@Body() patchUserDto: PatchUserDto) {
    console.log(patchUserDto);
    return 'user is patched';
  }
}
