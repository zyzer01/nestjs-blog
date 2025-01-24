import {
  IsArray,
  IsEnum,
  IsISO8601,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { PostType } from '../enum/post-type.enum';
import { PostStatus } from '../enum/post-status.enum';
import { CreatePostMetaOptionDto } from './create-post-meta-options.dto';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: 'The title of the post',
    example: 'My First Post',
  })
  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({
    description: 'The content of the post',
    example: 'This is the content of my first post',
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({
    enum: PostType,
    description: 'The type of the post',
    example: PostType.POST,
  })
  @IsString()
  @IsEnum(PostType)
  @IsNotEmpty()
  postType: PostType;

  @ApiProperty({
    enum: PostStatus,
    description: 'The status of the post',
    example: PostStatus.DRAFT,
  })
  @IsString()
  @IsEnum(PostStatus)
  status: PostStatus;

  @ApiProperty({
    description: 'The slug of the post',
    example: 'my-first-post',
  })
  @IsString()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'Slug must be kebab-case (all small letters and uses "-" without spaces)',
  })
  slug: string;

  @ApiPropertyOptional({
    description: 'Schema must be a serialized json object',
    example:
      '{\r\n    \"@context\": \"https:\/\/schema.org\",\r\n    \"@type\": \"Person\"\r\n  }',
  })
  @IsString()
  @IsOptional()
  @IsJSON()
  schema?: string;

  @ApiPropertyOptional({
    description: 'The featured image of the post',
    example: 'https://example.com/featured-image.jpg',
  })
  @IsString()
  @IsOptional()
  featuredImage?: string;

  @ApiPropertyOptional({
    description: 'The published date of the post',
    example: '2021-09-01T00:00:00Z',
  })
  @IsISO8601()
  @IsOptional()
  publishedOn?: Date;

  @ApiPropertyOptional({
    description: 'The tags of the post',
    example: ['tag1', 'tag2', 'tag3'],
  })
  @IsString({ each: true })
  @IsOptional()
  @IsArray()
  @MinLength(3, { each: true })
  tags?: string[];

  @ApiPropertyOptional({
    description: 'The meta options of the post',
    type: 'array',
    items: {
      type: 'object',
      properties: {
        key: {
          type: 'string',
          description: 'The key of the meta option, it can be any string',
          example: 'sidebarEnabled',
        },
        value: {
          type: 'string',
          description:
            'The value of the meta option, it can be any type of value',
          example: true,
        },
      },
    },
  })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaOptionDto)
  metaOptions?: CreatePostMetaOptionDto[];
}
