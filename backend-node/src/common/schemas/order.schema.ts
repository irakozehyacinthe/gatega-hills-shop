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

  // 75% advance payment workflow
  @Prop({ required: true, type: Number, default: 0 })
  advance_amount: number;

  @Prop({ required: true, type: Number, default: 0 })
  remaining_amount: number;

  @Prop({ required: true, type: Number, default: 0 })
  paid_amount: number;

  @Prop({ required: true, type: Number, default: 75 })
  payment_percentage: number; // advance required percentage (e.g. 75)

  @Prop({ default: 'pending_advance' })
  payment_status: string; // pending_advance, advance_paid, fully_paid, cancelled

  @Prop()
  payment_method?: string; // cash, card, mobile money


  @Prop()
  payment_proof_url?: string;

  @Prop({})
  advance_paid_at?: Date;

  @Prop({})
  fully_paid_at?: Date;

  @Prop({ default: 'pending' })
  order_status: string; // pending, processing, shipped, delivered, cancelled


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
