import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../../common/schemas/order.schema';
import { CreateOrderDto, OrderResponseDto, UpdateOrderStatusDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async create(userId: string, createOrderDto: CreateOrderDto): Promise<OrderResponseDto> {
    const order = new this.orderModel({ ...createOrderDto, user_id: userId });
    const savedOrder = await order.save();
    return this.mapToDto(savedOrder);
  }

  async findAllForUser(userId: string): Promise<OrderResponseDto[]> {
    const orders = await this.orderModel.find({ user_id: userId }).sort({ createdAt: -1 }).lean();
    return orders.map(o => this.mapToDto(o));
  }

  async findOneForUser(userId: string, id: string): Promise<OrderResponseDto> {
    const order = await this.orderModel.findOne({ _id: id, user_id: userId }).lean();
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return this.mapToDto(order);
  }

  async adminFindAll(): Promise<OrderResponseDto[]> {
    const orders = await this.orderModel.find().sort({ createdAt: -1 }).lean();
    return orders.map(o => this.mapToDto(o));
  }

  async adminFindOne(id: string): Promise<OrderResponseDto> {
    const order = await this.orderModel.findById(id).lean();
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return this.mapToDto(order);
  }

  async updateStatus(id: string, updateOrderStatusDto: UpdateOrderStatusDto): Promise<OrderResponseDto> {
    const order = await this.orderModel.findByIdAndUpdate(id, updateOrderStatusDto, { new: true }).lean();
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return this.mapToDto(order);
  }

  private mapToDto(order: any): OrderResponseDto {
    return {
      id: order._id.toString(),
      user_id: order.user_id.toString(),
      customer_name: order.customer_name,
      phone_number: order.phone_number,
      delivery_address: order.delivery_address,
      total_amount: order.total_amount,
      order_status: order.order_status,
      payment_status: order.payment_status,
      payment_method: order.payment_method,
      message: order.message,
      items: order.items || [],
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
  }
}
