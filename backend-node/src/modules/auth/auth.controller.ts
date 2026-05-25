import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, AuthResponseDto, UserResponseDto } from './dto/auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponseDto> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(loginDto);
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  async getUser(@Request() req): Promise<UserResponseDto> {
    const user = await this.authService.getUserById(req.user._id);
    return {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
      phone_number: user.phone_number,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(): Promise<{ message: string }> {
    return { message: 'Logged out successfully' };
  }
}
