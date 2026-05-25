// Simple API client for communicating with Laravel backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export class ApiClient {
  private token: string | null = null;

  constructor() {
    // Load token from localStorage on initialization
    this.token = localStorage.getItem('authToken');
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return this.token;
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('authToken');
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<{ data: T; status: number }> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.getHeaders(),
          ...(options.headers as Record<string, string>),
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return { data, status: response.status };
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Auth endpoints
  async register(name: string, email: string, password: string, phone?: string) {
    const { data } = await this.request('/register', {
      method: 'POST',
      body: JSON.stringify({
        name,
        email,
        password,
        password_confirmation: password,
        phone_number: phone,
      }),
    });
    return data;
  }

  async login(email: string, password: string) {
    const { data } = await this.request('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    return data;
  }

  async logout() {
    try {
      await this.request('/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout error:', error);
    }
    this.clearToken();
  }

  async getUser() {
    const { data } = await this.request('/user');
    return data;
  }

  // Product endpoints
  async getProducts(page = 1, category?: string) {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    if (category) params.append('category', category);
    const { data } = await this.request(`/products?${params}`);
    return data;
  }

  async getProduct(id: string) {
    const { data } = await this.request(`/products/${id}`);
    return data;
  }

  // Cart/Order endpoints
  async getOrders(page = 1) {
    const { data } = await this.request(`/orders?page=${page}`);
    return data;
  }

  async getOrder(id: string) {
    const { data } = await this.request(`/orders/${id}`);
    return data;
  }

  async createOrder(orderData: any) {
    const { data } = await this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
    return data;
  }

  // Admin endpoints
  async getAdminDashboard() {
    const { data } = await this.request('/admin/dashboard');
    return data;
  }

  async getAdminOrderStats() {
    const { data } = await this.request('/admin/orders/stats');
    return data;
  }

  async getAdminOrders(params?: Record<string, any>) {
    const query = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query.append(key, String(value));
        }
      });
    }
    const { data } = await this.request(`/admin/orders?${query}`);
    return data;
  }

  async updateOrderStatus(orderId: string, status: string, paymentStatus?: string) {
    const { data } = await this.request(`/admin/orders/${orderId}/status`, {
      method: 'PUT',
      body: JSON.stringify({
        order_status: status,
        ...(paymentStatus && { payment_status: paymentStatus }),
      }),
    });
    return data;
  }

  async getAdminCustomers(params?: Record<string, any>) {
    const query = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query.append(key, String(value));
        }
      });
    }
    const { data } = await this.request(`/admin/customers?${query}`);
    return data;
  }

  async getCustomerDetail(customerId: string) {
    const { data } = await this.request(`/admin/customers/${customerId}`);
    return data;
  }

  async getAdminUsers(params?: Record<string, any>) {
    const query = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query.append(key, String(value));
        }
      });
    }
    const { data } = await this.request(`/admin/users?${query}`);
    return data;
  }

  // Category endpoints
  async getCategories() {
    const { data } = await this.request('/categories');
    return data;
  }
}

export const apiClient = new ApiClient();
