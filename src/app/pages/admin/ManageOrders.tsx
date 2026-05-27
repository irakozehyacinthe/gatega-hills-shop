import { useState, useEffect } from 'react';
import { Navigate } from 'react-router';
import {
  Search,
  Eye,
  Phone,
  MapPin,
  MessageSquare,
  Package,
  CheckCircle,
  Clock,
  Truck,
  AlertCircle,
  X,
  DollarSign,
  User,
  CreditCard,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { apiClient } from '../../services/apiClient';
import { toast } from 'sonner';

interface Order {
  id: string;
  customer_name: string;
  phone_number: string;
  delivery_address: string;
  message?: string;
  payment_method: string;
  order_status:
    | 'pending'
    | 'approved'
    | 'on_delivery'
    | 'delivered'
    | 'cancelled';
  payment_status: 'pending' | 'paid' | 'failed';
  total_amount: number;
  items?: OrderItem[];
  created_at: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

interface OrderItem {
  id: string;
  product_id: string;
  quantity: number;
  price: number;
  product?: {
    name: string;
    image: string;
  };
}

const STATUS_CONFIG = {
  pending: { label: 'Pending', icon: Clock },
  approved: { label: 'Approved', icon: CheckCircle },
  on_delivery: { label: 'On Delivery', icon: Truck },
  delivered: { label: 'Delivered', icon: CheckCircle },
  cancelled: { label: 'Cancelled', icon: AlertCircle },
};

const PAYMENT_STATUS_CONFIG = {
  pending: { label: 'Pending' },
  paid: { label: 'Paid' },
  failed: { label: 'Failed' },
};

export function ManageOrders() {
  const { user } = useAuth();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] =
    useState<'all' | Order['order_status']>('all');

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const [updatingStatus, setUpdatingStatus] = useState(false);

  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    loadOrders();
    loadStats();
  }, [statusFilter]);

  const loadOrders = async () => {
    setLoading(true);

    try {
      const statusParam =
        statusFilter !== 'all'
          ? statusFilter
          : undefined;

      const result = await apiClient.getAdminOrders({
        order_status: statusParam,
        search: searchQuery || undefined,
        per_page: 20,
      });

      setOrders(result.data || result || []);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load orders');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const stats = await apiClient.getAdminOrderStats();
      setStats(stats);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusChange = async (
    orderId: string,
    newStatus: Order['order_status']
  ) => {
    setUpdatingStatus(true);

    try {
      const result = await apiClient.updateOrderStatus(orderId, newStatus);

      toast.success('Order status updated');

      loadOrders();

      if (selectedOrder?.id === orderId) {
        setSelectedOrder({
          ...selectedOrder,
          order_status: newStatus,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update order status');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const getStatusColor = (status: Order['order_status']) => {
    const colors = {
      pending:
        'bg-yellow-100 text-yellow-800 border border-yellow-300',
      approved:
        'bg-blue-100 text-blue-800 border border-blue-300',
      on_delivery:
        'bg-purple-100 text-purple-800 border border-purple-300',
      delivered:
        'bg-green-100 text-green-800 border border-green-300',
      cancelled:
        'bg-red-100 text-red-800 border border-red-300',
    };

    return colors[status];
  };

  const getPaymentColor = (
    status: Order['payment_status']
  ) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      paid: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
    };

    return colors[status];
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer_name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      order.phone_number?.includes(searchQuery) ||
      order.id?.includes(searchQuery);

    const matchesStatus =
      statusFilter === 'all' ||
      order.order_status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (!user || !user.is_admin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Order Management
          </h1>

          <p className="text-gray-600">
            Manage customer orders and messages
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            label="Total Orders"
            value={stats.totalOrders}
            icon={Package}
            color="blue"
          />

          <StatCard
            label="Pending Orders"
            value={stats.pendingOrders}
            icon={Clock}
            color="yellow"
          />

          <StatCard
            label="Delivered"
            value={stats.deliveredOrders}
            icon={CheckCircle}
            color="green"
          />

          <StatCard
            label="Revenue"
            value={`Rwf ${stats.totalRevenue.toLocaleString()}`}
            icon={DollarSign}
            color="red"
          />
        </div>

        {/* SEARCH */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />

              <input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(e.target.value)
                }
                onBlur={loadOrders}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value as
                    | 'all'
                    | Order['order_status']
                )
              }
              className="border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="on_delivery">
                On Delivery
              </option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No orders found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left">
                      Order ID
                    </th>

                    <th className="px-6 py-4 text-left">
                      Customer
                    </th>

                    <th className="px-6 py-4 text-left">
                      Amount
                    </th>

                    <th className="px-6 py-4 text-left">
                      Status
                    </th>

                    <th className="px-6 py-4 text-left">
                      Payment
                    </th>

                    <th className="px-6 py-4 text-left">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 font-bold">
                        #{order.id.slice(0, 8)}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-semibold">
                            {order.customer_name}
                          </span>

                          <span className="text-sm text-gray-500">
                            {order.phone_number}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 font-bold text-red-700">
                        Rwf{' '}
                        {order.total_amount.toLocaleString()}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                            order.order_status
                          )}`}
                        >
                          {
                            STATUS_CONFIG[order.order_status]
                              .label
                          }
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaymentColor(
                            order.payment_status
                          )}`}
                        >
                          {
                            PAYMENT_STATUS_CONFIG[
                              order.payment_status
                            ].label
                          }
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <button
                          onClick={() =>
                            setSelectedOrder(order)
                          }
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-semibold"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onStatusChange={handleStatusChange}
          updatingStatus={updatingStatus}
          getStatusColor={getStatusColor}
        />
      )}
    </div>
  );
}

/* =========================
   STAT CARD
========================= */

function StatCard({
  label,
  value,
  icon: Icon,
  color,
}: any) {
  const colors = {
    blue: 'bg-blue-100 text-blue-700',
    yellow: 'bg-yellow-100 text-yellow-700',
    green: 'bg-green-100 text-green-700',
    red: 'bg-red-100 text-red-700',
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">
            {label}
          </p>

          <h2 className="text-3xl font-bold text-gray-900">
            {value}
          </h2>
        </div>

        <div
          className={`p-3 rounded-lg ${
            colors[color as keyof typeof colors]
          }`}
        >
          <Icon className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
}

/* =========================
   ORDER MODAL
========================= */

function OrderDetailsModal({
  order,
  onClose,
  onStatusChange,
  updatingStatus,
  getStatusColor,
}: any) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* HEADER */}
        <div className="bg-gray-900 text-white p-6 flex justify-between items-center sticky top-0">
          <div>
            <h2 className="text-2xl font-bold">
              Order #{order.id.slice(0, 8)}
            </h2>

            <p className="text-gray-400 text-sm">
              {new Date(
                order.created_at
              ).toLocaleString()}
            </p>
          </div>

          <button
            onClick={onClose}
            className="hover:bg-gray-800 p-2 rounded-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-8 space-y-8">
          {/* STATUS */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-bold mb-4">
              Update Status
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {Object.entries(STATUS_CONFIG).map(
                ([status, config]) => (
                  <button
                    key={status}
                    disabled={updatingStatus}
                    onClick={() =>
                      onStatusChange(order.id, status)
                    }
                    className={`px-3 py-2 rounded-lg font-semibold text-sm ${
                      order.order_status === status
                        ? getStatusColor(status)
                        : 'bg-gray-200'
                    }`}
                  >
                    {config.label}
                  </button>
                )
              )}
            </div>
          </div>

          {/* CUSTOMER */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Customer Information
              </h3>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">
                    Full Name
                  </p>

                  <p className="font-bold">
                    {order.customer_name}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Phone
                  </p>

                  <p className="font-bold">
                    {order.phone_number}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Email
                  </p>

                  <p className="font-bold">
                    {order.user?.email ||
                      'No email available'}
                  </p>
                </div>
              </div>
            </div>

            {/* PAYMENT */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-green-600" />
                Payment Information
              </h3>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">
                    Payment Method
                  </p>

                  <p className="font-bold capitalize">
                    {order.payment_method?.replace(
                      /_/g,
                      ' '
                    )}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Total Amount
                  </p>

                  <p className="font-bold text-red-700 text-xl">
                    Rwf{' '}
                    {order.total_amount.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ADDRESS */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-purple-600" />
              Delivery Address
            </h3>

            <p>{order.delivery_address}</p>
          </div>

          {/* MESSAGE */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-orange-600" />
              Customer Message
            </h3>

            {order.message &&
            order.message.trim() !== '' ? (
              <p>{order.message}</p>
            ) : (
              <p className="italic text-gray-500">
                No customer message
              </p>
            )}
          </div>

          {/* ITEMS */}
          <div>
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-indigo-600" />
              Order Items (
              {order.items?.length || 0})
            </h3>

            <div className="space-y-4">
              {order.items?.map((item: OrderItem) => (
                <div
                  key={item.id}
                  className="flex gap-4 border rounded-lg p-4"
                >
                  <img
                    src={
                      item.product?.image ||
                      '/placeholder.png'
                    }
                    alt={
                      item.product?.name ||
                      'Unknown Product'
                    }
                    className="w-20 h-20 rounded object-cover"
                  />

                  <div className="flex-1">
                    <p className="font-bold">
                      {item.product?.name ||
                        'Unknown Product'}
                    </p>

                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity} × Rwf{' '}
                      {item.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="font-bold text-red-700">
                    Rwf{' '}
                    {(
                      item.quantity * item.price
                    ).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CLOSE */}
          <button
            onClick={onClose}
            className="w-full bg-gray-300 hover:bg-gray-400 py-3 rounded-lg font-bold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}