import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { router } from './routes';
import { Toaster } from 'sonner';
import { useEffect } from 'react';
import { initializeData } from './utils/initializeData';

export default function App() {
  // Initialize mock data on first load
  useEffect(() => {
    initializeData();
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" richColors />
      </CartProvider>
    </AuthProvider>
  );
}