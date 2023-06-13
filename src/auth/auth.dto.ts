import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @ApiProperty({ type: String })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  password: string;
}

export class RegisterDto {
  @IsNotEmpty()
  @ApiProperty({ type: String })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ type: String })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  password: string;
}
