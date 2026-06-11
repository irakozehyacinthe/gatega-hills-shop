import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router';
import { Package, ShoppingCart, Users, DollarSign } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Order, mockProducts } from '../../data/mockData';

export function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
  });

  useEffect(() => {
    // Calculate stats
    const storedOrders = localStorage.getItem('orders');
    const orders: Order[] = storedOrders ? JSON.parse(storedOrders) : [];
    
    const totalRevenue = orders.reduce((sum, order) => sum + order.total_price, 0);
    const pendingOrders = orders.filter(order => order.status === 'Pending').length;

    setStats({
      totalProducts: mockProducts.length,
      totalOrders: orders.length,
      totalRevenue,
      pendingOrders,
    });
  }, []);

  if (!user || (user.role !== 'admin' && user.role !== 'super_admin')) {
    return <Navigate to="/login" replace />;
  }



  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-4 rounded-lg">
                <Package className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-600">Total Products</p>
                <p className="text-3xl font-bold">{stats.totalProducts}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-4 rounded-lg">
                <ShoppingCart className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <p className="text-gray-600">Total Orders</p>
                <p className="text-3xl font-bold">{stats.totalOrders}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-4 rounded-lg">
                <DollarSign className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-600">Total Revenue</p>
                <p className="text-3xl font-bold">${stats.totalRevenue.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-4 rounded-lg">
                <Package className="w-8 h-8 text-orange-600" />
              </div>
              <div>
                <p className="text-gray-600">Pending Orders</p>
                <p className="text-3xl font-bold">{stats.pendingOrders}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/admin/products"
            className="bg-white rounded-lg shadow-md p-8 hover:shadow-xl transition"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-red-100 p-4 rounded-lg">
                <Package className="w-8 h-8 text-red-700" />
              </div>
              <h2 className="text-2xl font-bold">Manage Products</h2>
            </div>
            <p className="text-gray-600">
              Add, edit, or remove products from your inventory
            </p>
          </Link>

          <Link
            to="/admin/orders"
            className="bg-white rounded-lg shadow-md p-8 hover:shadow-xl transition"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-orange-100 p-4 rounded-lg">
                <ShoppingCart className="w-8 h-8 text-orange-500" />
              </div>
              <h2 className="text-2xl font-bold">Manage Orders</h2>
            </div>
            <p className="text-gray-600">
              View and update order status, manage deliveries
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
