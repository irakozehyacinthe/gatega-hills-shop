/**
 * Order API Service
 * Handles all order-related API calls for GATEGA HILLS SHOP
 */

import {
  Order,
  CreateOrderPayload,
  UpdateOrderStatusPayload,
  OrderFilterParams,
  OrderStatistics,
  ApiResponse,
  PaginatedResponse
} from '../types/order';

const API_BASE =
  import.meta.env.VITE_API_URL?.replace(/\/$/, '') ||
  'http://localhost:8000/api';

class OrderService {

  /**
   * Get authentication headers
   */
  private getAuthHeader(): HeadersInit {
    const token = localStorage.getItem('auth_token');

    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    };
  }

  /**
   * Handle API responses safely
   */
  private async handleResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type');

    let data: any = null;

    if (contentType?.includes('application/json')) {
      data = await response.json();
    }

    if (!response.ok) {
      throw new Error(
        data?.message ||
        data?.error ||
        `Request failed with status ${response.status}`
      );
    }

    return data;
  }

  /**
   * Create a new order
   */
  async createOrder(
    payload: CreateOrderPayload
  ): Promise<ApiResponse<{ order: Order }>> {

    const response = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: this.getAuthHeader(),
      body: JSON.stringify(payload),
    });

    return this.handleResponse(response);
  }

  /**
   * Get user's orders
   */
  async getUserOrders(
    filters?: OrderFilterParams
  ): Promise<PaginatedResponse<Order>> {

    const params = new URLSearchParams();

    if (filters?.order_status) {
      params.append('order_status', filters.order_status);
    }

    if (filters?.payment_status) {
      params.append('payment_status', filters.payment_status);
    }

    if (filters?.per_page) {
      params.append('per_page', filters.per_page.toString());
    }

    if (filters?.page) {
      params.append('page', filters.page.toString());
    }

    const response = await fetch(
      `${API_BASE}/orders?${params.toString()}`,
      {
        method: 'GET',
        headers: this.getAuthHeader(),
      }
    );

    return this.handleResponse(response);
  }

  /**
   * Get single order
   */
  async getOrder(
    orderId: string
  ): Promise<ApiResponse<{ order: Order }>> {

    const response = await fetch(
      `${API_BASE}/orders/${orderId}`,
      {
        method: 'GET',
        headers: this.getAuthHeader(),
      }
    );

    return this.handleResponse(response);
  }

  /**
   * Get admin orders
   */
  async getAdminOrders(
    filters?: OrderFilterParams
  ): Promise<PaginatedResponse<Order>> {

    const params = new URLSearchParams();

    if (
      filters?.order_status &&
      filters.order_status !== 'all'
    ) {
      params.append('order_status', filters.order_status);
    }

    if (filters?.search) {
      params.append('search', filters.search);
    }

    if (filters?.start_date) {
      params.append('start_date', filters.start_date);
    }

    if (filters?.end_date) {
      params.append('end_date', filters.end_date);
    }

    if (filters?.per_page) {
      params.append('per_page', filters.per_page.toString());
    }

    if (filters?.page) {
      params.append('page', filters.page.toString());
    }

    const response = await fetch(
      `${API_BASE}/admin/orders?${params.toString()}`,
      {
        method: 'GET',
        headers: this.getAuthHeader(),
      }
    );

    return this.handleResponse(response);
  }

  /**
   * Get order statistics
   */
  async getOrderStats(): Promise<OrderStatistics> {

    const response = await fetch(
      `${API_BASE}/admin/orders/stats`,
      {
        method: 'GET',
        headers: this.getAuthHeader(),
      }
    );

    return this.handleResponse(response);
  }

  /**
   * Update order status
   */
  async updateOrderStatus(
    orderId: string,
    payload: UpdateOrderStatusPayload
  ): Promise<ApiResponse<{ order: Order }>> {

    const response = await fetch(
      `${API_BASE}/admin/orders/${orderId}/status`,
      {
        method: 'PUT',
        headers: this.getAuthHeader(),
        body: JSON.stringify(payload),
      }
    );

    return this.handleResponse(response);
  }

  /**
   * Cancel order
   */
  async cancelOrder(
    orderId: string
  ): Promise<ApiResponse<{ order: Order }>> {

    return this.updateOrderStatus(orderId, {
      order_status: 'cancelled'
    });
  }

  /**
   * Export orders CSV
   */
  async exportOrders(
    filters?: OrderFilterParams
  ): Promise<Blob> {

    const params = new URLSearchParams();

    if (filters?.order_status) {
      params.append('order_status', filters.order_status);
    }

    if (filters?.start_date) {
      params.append('start_date', filters.start_date);
    }

    if (filters?.end_date) {
      params.append('end_date', filters.end_date);
    }

    const response = await fetch(
      `${API_BASE}/admin/orders/export?${params.toString()}`,
      {
        method: 'GET',
        headers: this.getAuthHeader(),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to export orders');
    }

    return response.blob();
  }
}

export default new OrderService();