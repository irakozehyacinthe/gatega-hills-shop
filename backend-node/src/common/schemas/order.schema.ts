import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class OrderItem extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  product_id: Types.ObjectId;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true, type: Number })
  price: number; // Price at time of order

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user_id: Types.ObjectId;

  @Prop({ required: true })
  customer_name: string;

  @Prop()
  phone_number?: string;

  @Prop()
  delivery_address?: string;

  @Prop({ required: true, type: Number })
  total_amount: number;

  @Prop({ default: 'pending' })
  order_status: string; // pending, processing, shipped, delivered, cancelled

  @Prop({ default: 'pending' })
  payment_status: string; // pending, completed, failed

  @Prop()
  payment_method?: string; // cash, card, mobile money

  @Prop()
  message?: string;

  @Prop({ type: [OrderItemSchema] })
  items: OrderItem[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
OrderSchema.index({ user_id: 1 });
OrderSchema.index({ order_status: 1 });
OrderSchema.index({ createdAt: -1 });
