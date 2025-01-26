import { IsJSON, IsNotEmpty, IsString } from 'class-validator';

export class CreateMetaOptionDto {
  @IsString()
  @IsNotEmpty()
  @IsJSON()
  metaValue: string;
}
