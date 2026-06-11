import { createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Orders } from './pages/Orders';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ManageProducts } from './pages/admin/ManageProducts';
import { ManageOrders } from './pages/admin/ManageOrders';
import { ProtectedAdminRoute } from './components/ProtectedAdminRoute';

import { RootLayout } from './layouts/RootLayout';
import { NotFound } from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: 'products', Component: Products },
      { path: 'products/:id', Component: ProductDetails },
      { path: 'cart', Component: Cart },
      { path: 'checkout', Component: Checkout },
      { path: 'orders', Component: Orders },
      { path: 'login', Component: Login },
      { path: 'register', Component: Register },
      { path: 'dashboard', Component: Dashboard },
      
      
      // Admin routes (role-protected)
      {
        path: 'admin',
        element: (
          <ProtectedAdminRoute>
            <AdminDashboard />
          </ProtectedAdminRoute>
        ),
      },
      {
        path: 'admin/products',
        element: (
          <ProtectedAdminRoute>
            <ManageProducts />
          </ProtectedAdminRoute>
        ),
      },
      {
        path: 'admin/orders',
        element: (
          <ProtectedAdminRoute>
            <ManageOrders />
          </ProtectedAdminRoute>
        ),
      },
      
      { path: '*', Component: NotFound },
    ],
  },
]);
