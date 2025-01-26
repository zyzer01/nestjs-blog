import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTagDto {
  @ApiProperty({
    description: 'The name of the tag',
    example: 'Software Engineering',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(256)
  name: string;

  @ApiProperty({
    description: 'The slug of the tag',
    example: 'software-engineering',
  })
  @IsString()
  @MaxLength(256)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'Slug must be kebab-case (all small letters and uses "-" without spaces)',
  })
  slug: string;

  @ApiPropertyOptional({
    description: 'The description of the tag',
    example: 'This is the description of my tag',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Schema must be a serialized json object',
    example:
      '{\r\n    \"@context\": \"https:\/\/schema.org\",\r\n    \"@type\": \"Person\"\r\n  }',
  })
  @IsOptional()
  @IsString()
  schema?: string;

  @ApiPropertyOptional({
    description: 'The featured image of the post',
    example: 'https://example.com/featured-image.jpg',
  })
  @IsOptional()
  featuredImage?: string;
}
