/**
 * Order Management Type Definitions
 * For GATEGA HILLS SHOP Admin System
 */

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  product?: {
    id: string;
    name: string;
    image: string;
    description?: string;
  };
}

export interface Order {
  id: string;
  user_id: string;
  customer_name: string;
  phone_number: string;
  delivery_address: string;
  message?: string | null;
  payment_method: 'cash_on_delivery' | 'card' | 'mobile_money' | 'bank_transfer';
  order_status: 'pending' | 'approved' | 'on_delivery' | 'delivered' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'failed';
  total_amount: number;
  items: OrderItem[];
  created_at: string;
  updated_at: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface OrderFilterParams {
  order_status?: string;
  search?: string;
  start_date?: string;
  end_date?: string;
  per_page?: number;
  page?: number;
}

export interface OrderStatistics {
  total_orders: number;
  pending_orders: number;
  delivered_orders: number;
  total_revenue: number;
}

export interface CreateOrderPayload {
  items: Array<{
    product_id: string | number;
    quantity: number;
  }>;
  customer_name: string;
  phone_number: string;
  delivery_address: string;
  message?: string | null;
  payment_method: string;
}

export interface UpdateOrderStatusPayload {
  order_status?: Order['order_status'];
  payment_status?: Order['payment_status'];
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

export const ORDER_STATUS_LABELS = {
  pending: 'Pending',
  approved: 'Approved',
  on_delivery: 'On Delivery',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
} as const;

export const PAYMENT_METHOD_LABELS = {
  cash_on_delivery: 'Cash on Delivery',
  card: 'Credit/Debit Card',
  mobile_money: 'Mobile Money',
  bank_transfer: 'Bank Transfer',
} as const;

export const PAYMENT_STATUS_LABELS = {
  pending: 'Pending',
  paid: 'Paid',
  failed: 'Failed',
} as const;
