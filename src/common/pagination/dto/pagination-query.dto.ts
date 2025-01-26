import { IsOptional, IsPositive, Max } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  @Max(500)
  limit?: number = 10;

  @IsOptional()
  @IsPositive()
  page?: number = 1;
}
