import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

export function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  if (isAuthenticated) {
    navigate('/');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = login(formData.email, formData.password);
    
    if (success) {
      toast.success('Login successful!');
      navigate('/');
    } else {
      toast.error('Invalid email or password');
    }
  };

  const fillDemoCredentials = (role: 'user' | 'admin' | 'superadmin') => {
    const credentials = {
      user: { email: 'user@boston.com', password: 'user123' },
      admin: { email: 'admin@boston.com', password: 'admin123' },
    };
     

  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogIn className="w-8 h-8 text-red-700" />
            </div>
            <h2 className="text-3xl font-bold">Welcome Back</h2>
            <p className="text-gray-600 mt-2">Login to your Boston Market account</p>
          </div>

          {/* Demo Credentials */}
          <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm font-bold mb-2">Demo Accounts:</p>
            <div className="space-y-1 text-sm">
              <button
                type="button"
                onClick={() => fillDemoCredentials('user')}
                className="block w-full text-left text-blue-700 hover:underline"
              >
                User: user@boston.com / user123
              </button>
              <button
                type="button"
                onClick={() => fillDemoCredentials('admin')}
                className="block w-full text-left text-blue-700 hover:underline"
              >
                Admin: admin@boston.com / admin123
              </button>
              <button
                type="button"
                onClick={() => fillDemoCredentials('superadmin')}
                className="block w-full text-left text-blue-700 hover:underline"
              >
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-bold mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block font-bold mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-700 text-white py-3 rounded-lg font-bold hover:bg-red-800 transition"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-red-700 font-bold hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
