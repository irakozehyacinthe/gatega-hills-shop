import { IsString, IsNumber, IsOptional, IsMongoId, IsArray, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderItemDto {
  @IsMongoId()
  product_id: string;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  @Min(0)
  price: number;
}

export class CreateOrderDto {
  @IsString()
  customer_name: string;

  @IsOptional()
  @IsString()
  phone_number?: string;

  @IsOptional()
  @IsString()
  delivery_address?: string;

  @IsNumber()
  @Min(0)
  total_amount: number;

  @IsOptional()
  @IsString()
  payment_method?: string;

  @IsOptional()
  @IsString()
  message?: string;

  @IsArray()
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}

export class UpdateOrderStatusDto {
  @IsString()
  order_status: string;
}

export class OrderResponseDto {
  id: string;
  user_id: string;
  customer_name: string;
  phone_number?: string;
  delivery_address?: string;
  total_amount: number;
  order_status: string;
  payment_status: string;
  payment_method?: string;
  message?: string;
  items: OrderItemDto[];
  createdAt: Date;
  updatedAt: Date;
}
