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

  // 75% advance workflow
  advance_amount: number;
  remaining_amount: number;
  paid_amount: number;
  payment_percentage: number;

  order_status: string;
  payment_status: string;
  payment_method?: string;
  payment_proof_url?: string;
  advance_paid_at?: Date;
  fully_paid_at?: Date;

  message?: string;
  items: OrderItemDto[];
  createdAt: Date;
  updatedAt: Date;
}

