import React from 'react';
import { Link, useLocation } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { BarChart3, Package, Users, LogOut, Home } from 'lucide-react';
import { Button } from './button';

export const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const { logout } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const handleLogout = async () => {
    await logout();
  };

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/admin/orders', label: 'Orders', icon: Package },
    { path: '/admin/customers', label: 'Customers', icon: Users },
    { path: '/', label: 'Back to Store', icon: Home },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen">
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>

      <nav className="mt-8 space-y-2 px-4">
        {navItems.map(({ path, label, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive(path)
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <Icon size={20} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-6 left-4 right-4">
        <Button
          onClick={handleLogout}
          variant="destructive"
          className="w-full flex items-center justify-center gap-2"
        >
          <LogOut size={18} />
          Logout
        </Button>
      </div>
    </aside>
  );
};
