import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  phone_number?: string;
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class UserResponseDto {
  id: string;
  email: string;
  name: string;
  role: string;
  phone_number?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class AuthResponseDto {
  access_token: string;
  user: UserResponseDto;
}
