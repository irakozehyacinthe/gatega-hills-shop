import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from '../../common/schemas/user.schema';
import { RegisterDto, LoginDto, AuthResponseDto, UserResponseDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const { email, name, password, phone_number } = registerDto;

    // Check if user already exists
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new this.userModel({
      email,
      name,
      password: hashedPassword,
      phone_number,
      role: 'customer',
    });

    const savedUser = await user.save();

    // Generate JWT token
    const token = this.jwtService.sign({
      email: savedUser.email,
      sub: savedUser._id.toString(),
    });

    return {
      access_token: token,
      user: this.mapUserToDto(savedUser),
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const { email, password } = loginDto;

    // Find user
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const token = this.jwtService.sign({
      email: user.email,
      sub: user._id.toString(),
    });

    return {
      access_token: token,
      user: this.mapUserToDto(user),
    };
  }

  async validateUser(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).lean();
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userModel.findById(id).lean();
  }

  private mapUserToDto(user: any): UserResponseDto {
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
}
