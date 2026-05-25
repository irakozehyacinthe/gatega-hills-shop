import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../../common/schemas/product.schema';
import { CreateProductDto, UpdateProductDto, UpdateStockDto, ProductResponseDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  async create(createProductDto: CreateProductDto): Promise<ProductResponseDto> {
    const product = new this.productModel(createProductDto);
    const savedProduct = await product.save();
    return this.mapToDto(savedProduct);
  }

  async findAll(categoryId?: string): Promise<ProductResponseDto[]> {
    const query = categoryId ? { category_id: categoryId } : {};
    const products = await this.productModel.find(query).sort({ createdAt: -1 }).lean();
    return products.map(product => this.mapToDto(product));
  }

  async findOne(id: string): Promise<ProductResponseDto> {
    const product = await this.productModel.findById(id).lean();
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return this.mapToDto(product);
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<ProductResponseDto> {
    const product = await this.productModel.findByIdAndUpdate(
      id,
      updateProductDto,
      { new: true },
    ).lean();

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.mapToDto(product);
  }

  async updateStock(id: string, updateStockDto: UpdateStockDto): Promise<ProductResponseDto> {
    const product = await this.productModel.findById(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const newStock = product.stock + updateStockDto.quantity;

    if (newStock < 0) {
      throw new BadRequestException('Insufficient stock');
    }

    product.stock = newStock;
    const updatedProduct = await product.save();

    return this.mapToDto(updatedProduct);
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.productModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException('Product not found');
    }
    return { message: 'Product deleted successfully' };
  }

  private mapToDto(product: any): ProductResponseDto {
    return {
      id: product._id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      image: product.image,
      category_id: product.category_id.toString(),
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
