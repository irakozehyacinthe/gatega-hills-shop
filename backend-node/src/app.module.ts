import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './modules/auth/auth.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';

import { SuperAdminSeed } from './common/seed/super-admin.seed';


import { User, UserSchema } from './common/schemas/user.schema';
import { Category, CategorySchema } from './common/schemas/category.schema';
import { Product, ProductSchema } from './common/schemas/product.schema';
import { Order, OrderSchema } from './common/schemas/order.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRoot(
      process.env.MONGODB_URI ||
      'mongodb://localhost:27017/gatega_hills',
    ),

    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Product.name, schema: ProductSchema },
      { name: Order.name, schema: OrderSchema },
    ]),

    AuthModule,
    CategoriesModule,
    ProductsModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [SuperAdminSeed],
})
export class AppModule {}
