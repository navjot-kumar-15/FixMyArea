import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class VerifyOtpDto {
  @ApiProperty({
    description: 'The token sent to the user email',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @IsNotEmpty()
  @IsString()
  token: string;

  @ApiProperty({
    description: 'The OTP sent to the user email',
    example: 123456,
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  otp: number;
}
