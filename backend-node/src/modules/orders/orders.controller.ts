import { Controller, Get, Post, Body, Param, UseGuards, Request, Put } from '@nestjs/common';
import { OrderService } from './orders.service';
import { CreateOrderDto, OrderResponseDto, UpdateOrderStatusDto } from './dto/order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAllForUser(@Request() req): Promise<OrderResponseDto[]> {
    return this.orderService.findAllForUser(req.user._id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOneForUser(@Request() req, @Param('id') id: string): Promise<OrderResponseDto> {
    return this.orderService.findOneForUser(req.user._id, id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Request() req, @Body() createOrderDto: CreateOrderDto): Promise<OrderResponseDto> {
    return this.orderService.create(req.user._id, createOrderDto);
  }

  // Admin routes
  @Get('admin')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async adminFindAll(): Promise<OrderResponseDto[]> {
    return this.orderService.adminFindAll();
  }

  @Get('admin/:id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async adminFindOne(@Param('id') id: string): Promise<OrderResponseDto> {
    return this.orderService.adminFindOne(id);
  }

  @Put('admin/:id/status')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async updateStatus(@Param('id') id: string, @Body() updateOrderStatusDto: UpdateOrderStatusDto): Promise<OrderResponseDto> {
    return this.orderService.updateStatus(id, updateOrderStatusDto);
  }
}
