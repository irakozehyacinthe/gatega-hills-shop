import { IsString, IsNumber, IsOptional, IsMongoId, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsOptional()
  @IsString()
  image?: string;

  @IsMongoId()
  category_id: string;
}

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsMongoId()
  category_id?: string;
}

export class UpdateStockDto {
  @IsNumber()
  quantity: number;
}

export class ProductResponseDto {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  image?: string;
  category_id: string;
  createdAt: Date;
  updatedAt: Date;
}
