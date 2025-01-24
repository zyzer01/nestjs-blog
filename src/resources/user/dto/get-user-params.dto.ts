import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class GetUserParamsDto {
  @ApiPropertyOptional({
    description: 'Get user with a specific id',
    example: 123,
  })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  id?: number;
}
