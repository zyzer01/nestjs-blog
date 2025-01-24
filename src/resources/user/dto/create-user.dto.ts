import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  @MaxLength(50)
  lastName: string;

  @IsEmail()
  @MaxLength(50)
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(96)
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message:
      'Minimum eight characters, at least one uppercase letter, one lowercase letter and one number',
  })
  password: string;
}
