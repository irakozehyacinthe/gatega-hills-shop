import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { User, Package, MapPin, Phone, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Order } from '../data/mockData';

export function Dashboard() {
  const { user } = useAuth();
  const [orderCount, setOrderCount] = useState(0);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (user) {
      const storedOrders = localStorage.getItem('orders');
      if (storedOrders) {
        const allOrders: Order[] = JSON.parse(storedOrders);
        const userOrders = allOrders.filter((order) => order.user_id === user.id);
        setOrderCount(userOrders.length);
        
        // Get 3 most recent orders
        const recent = userOrders
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 3);
        setRecentOrders(recent);
      }
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Please login to view dashboard</h2>
          <Link
            to="/login"
            className="inline-block bg-red-700 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-800 transition"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">My Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4">
              <div className="bg-red-100 p-4 rounded-lg">
                <Package className="w-8 h-8 text-red-700" />
              </div>
              <div>
                <p className="text-gray-600">Total Orders</p>
                <p className="text-3xl font-bold">{orderCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-4 rounded-lg">
                <User className="w-8 h-8 text-orange-500" />
              </div>
              <div>
                <p className="text-gray-600">Account Type</p>
                <p className="text-3xl font-bold capitalize">{user.role}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <Link to="/orders" className="block hover:shadow-lg transition">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-4 rounded-lg">
                  <Package className="w-8 h-8 text-green-500" />
                </div>
                <div>
                  <p className="text-gray-600">View All Orders</p>
                  <p className="text-red-700 font-bold">Go to Orders →</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-gray-600 mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Full Name</p>
                  <p className="font-bold">{user.name}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-600 mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-bold">{user.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-600 mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-bold">{user.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-600 mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="font-bold">{user.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Recent Orders</h2>
              {orderCount > 0 && (
                <Link to="/orders" className="text-red-700 hover:underline font-bold">
                  View All
                </Link>
              )}
            </div>

            {recentOrders.length > 0 ? (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="border-b pb-4 last:border-b-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-bold">Order #{order.id}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-lg text-sm font-bold ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' :
                        order.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-lg font-bold text-red-700">
                      ${order.total_price.toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No orders yet</p>
                <Link
                  to="/products"
                  className="inline-block bg-red-700 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-800 transition"
                >
                  Start Shopping
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
