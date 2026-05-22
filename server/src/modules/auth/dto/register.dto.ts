import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class RegisterDto {
  @ApiProperty({ example: 'john' })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim().toLowerCase())
  first_name: string;

  @ApiProperty({ example: 'doe' })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim().toLowerCase())
  last_name: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value?.trim().toLowerCase())
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
