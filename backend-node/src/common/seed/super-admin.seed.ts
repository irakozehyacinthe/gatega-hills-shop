import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

import { User } from '../../common/schemas/user.schema';

const DEFAULT_SUPER_ADMIN_EMAIL = 'hyacintheirakoze7@gmail.com';
const DEFAULT_SUPER_ADMIN_PASSWORD = 'uwase@123';

@Injectable()
export class SuperAdminSeed implements OnModuleInit {
  private readonly logger = new Logger(SuperAdminSeed.name);

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async onModuleInit() {
    await this.ensureSeed();
  }

  private async ensureSeed() {
    // Create only if missing (idempotent)
    const existing = await this.userModel.findOne({ email: DEFAULT_SUPER_ADMIN_EMAIL });
    if (existing) {
      this.logger.log(`Super admin already exists: ${DEFAULT_SUPER_ADMIN_EMAIL}`);
      return;
    }

    const hashedPassword = await bcrypt.hash(DEFAULT_SUPER_ADMIN_PASSWORD, 10);

    await this.userModel.create({
      email: DEFAULT_SUPER_ADMIN_EMAIL,
      name: 'Super Admin',
      password: hashedPassword,
      role: 'super_admin',
    });

    this.logger.log(`Seeded default super admin: ${DEFAULT_SUPER_ADMIN_EMAIL}`);
  }
}

