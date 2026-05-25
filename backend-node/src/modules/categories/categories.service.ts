import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from '../../common/schemas/category.schema';
import { CreateCategoryDto, UpdateCategoryDto, CategoryResponseDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryResponseDto> {
    const category = new this.categoryModel(createCategoryDto);
    const savedCategory = await category.save();
    return this.mapToDto(savedCategory);
  }

  async findAll(): Promise<CategoryResponseDto[]> {
    const categories = await this.categoryModel.find().sort({ createdAt: -1 }).lean();
    return categories.map(cat => this.mapToDto(cat));
  }

  async findOne(id: string): Promise<CategoryResponseDto> {
    const category = await this.categoryModel.findById(id).lean();
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return this.mapToDto(category);
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<CategoryResponseDto> {
    const category = await this.categoryModel.findByIdAndUpdate(
      id,
      updateCategoryDto,
      { new: true },
    ).lean();

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return this.mapToDto(category);
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.categoryModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException('Category not found');
    }
    return { message: 'Category deleted successfully' };
  }

  private mapToDto(category: any): CategoryResponseDto {
    return {
      id: category._id.toString(),
      name: category.name,
      description: category.description,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
  }
}
