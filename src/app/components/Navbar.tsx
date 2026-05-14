import { Link } from 'react-router';
import { ShoppingCart, User, LogOut, LayoutDashboard, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <nav className="bg-gradient-to-r from-green-600 to-green-500 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold hover:text-green-100 transition flex items-center gap-2">
            🛒 GATEGA HILLS SHOP
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="hover:text-green-100 transition font-medium">
              Home
            </Link>
            <Link to="/products" className="hover:text-green-100 transition font-medium">
              Products
            </Link>
            {isAuthenticated && (
              <Link to="/orders" className="hover:text-green-100 transition font-medium">
                My Orders
              </Link>
            )}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <button className="bg-green-700 hover:bg-green-800 p-2 rounded transition">
              <Search className="w-5 h-5" />
            </button>

            {/* Cart */}
            <Link to="/cart" className="relative hover:text-green-100 transition">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-green-600 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                {/* Dashboard Link based on role */}
                {user?.role === 'admin' && (
                  <Link to="/admin" className="flex items-center gap-1 hover:text-green-100 transition">
                    <LayoutDashboard className="w-5 h-5" />
                    <span className="hidden lg:inline">Admin</span>
                  </Link>
                )}
                {user?.role === 'user' && (
                  <Link to="/dashboard" className="flex items-center gap-1 hover:text-green-100 transition">
                    <User className="w-5 h-5" />
                    <span className="hidden lg:inline">{user.name}</span>
                  </Link>
                )}
                
                <button
                  onClick={logout}
                  className="flex items-center gap-1 hover:text-green-100 transition"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="hidden lg:inline">Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-white text-green-600 px-4 py-2 rounded hover:bg-gray-100 transition font-bold"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
