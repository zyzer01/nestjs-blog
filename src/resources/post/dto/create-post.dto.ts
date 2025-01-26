import {
  IsArray,
  IsDate,
  IsEnum,
  IsInt,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { PostType } from '../enum/post-type.enum';
import { PostStatus } from '../enum/post-status.enum';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateMetaOptionDto } from 'src/resources/meta-option/dto/create-meta-option.dto';

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
  @MaxLength(256)
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
  @MaxLength(1024)
  featuredImage?: string;

  @ApiPropertyOptional({
    description: 'The published date of the post',
    example: '2021-09-01T00:00:00Z',
  })
  @IsDate()
  @IsOptional()
  publishedOn?: Date;

  @ApiPropertyOptional({
    description: 'The array of ids of tags of the post',
    example: [1, 2],
  })
  @IsInt({ each: true })
  @IsOptional()
  @IsArray()
  tags?: number[];

  @ApiProperty({
    type: 'integer',
    required: true,
    description: 'The ID of the post author',
    example: 6,
  })
  @IsInt()
  authorId: number;

  @ApiPropertyOptional({
    description: 'The meta options of the post',
    type: 'object',
    example: { metaValue: '{"sidebarEnabled": true}' },
    properties: {
      metaValue: {
        type: 'string',
        description: 'The meta value, it is a JSON string',
        example: '{"sidebarEnabled": true}',
      },
    },
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateMetaOptionDto)
  metaOptions?: CreateMetaOptionDto | null;
}
