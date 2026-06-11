import { useState } from 'react';

import { Link, useNavigate, Navigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

export function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated, user } = useAuth();


  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Redirect if already logged in
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle login submit
  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await login(
        formData.email,
        formData.password
      );

      toast.success('Login successful!');

      // Redirect based on authenticated user's role (from AuthContext)
      const role = user?.role;








      if (role === 'admin' || role === 'super_admin') {

        navigate('/admin');
      } else {
        navigate('/');
      }



    } catch (error) {
      toast.error('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">

        <div className="bg-white rounded-lg shadow-md p-8">

          {/* Header */}
          <div className="text-center mb-8">

            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogIn className="w-8 h-8 text-red-700" />
            </div>

            <h2 className="text-3xl font-bold">
              Welcome Back
            </h2>

            <p className="text-gray-600 mt-2">
              Login to your account
            </p>

          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            {/* Email */}
            <div>

              <label className="block font-bold mb-2">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />

            </div>

            {/* Password */}
            <div>

              <label className="block font-bold mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />

            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-red-700 text-white py-3 rounded-lg font-bold hover:bg-red-800 transition"
            >
              Login
            </button>

          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">

            <p className="text-gray-600">
              Don't have an account?{' '}

              <Link
                to="/register"
                className="text-red-700 font-bold hover:underline"
              >
                Sign Up
              </Link>

            </p>

          </div>

        </div>

      </div>
    </div>
  );
}