import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

export function Register() {
  const navigate = useNavigate();
  const { register, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
  });

  if (isAuthenticated) {
    navigate('/');
    return null;
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ❌ Block admin account registration
    if (formData.email === 'admin@gategahills.com') {
      toast.error('Admin account cannot be registered');
      return;
    }

    // Password match validation
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    // Password length validation
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    const success = register(
      formData.name,
      formData.email,
      formData.password,
      formData.phone,
      formData.address
    );

    if (success) {
      toast.success('Account created successfully! Welcome!');
      navigate('/');
    } else {
      toast.error('Email already exists');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">

          {/* HEADER */}
          <div className="text-center mb-8">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-8 h-8 text-red-700" />
            </div>
            <h2 className="text-3xl font-bold">Create Account</h2>
            <p className="text-gray-600 mt-2">Join us today</p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Full Name"
              className="w-full px-4 py-3 border rounded-lg"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Email Address"
              className="w-full px-4 py-3 border rounded-lg"
            />

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              placeholder="Phone Number"
              className="w-full px-4 py-3 border rounded-lg"
            />

            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              placeholder="Home Address"
              className="w-full px-4 py-3 border rounded-lg"
            />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Password"
              className="w-full px-4 py-3 border rounded-lg"
            />

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              placeholder="Confirm Password"
              className="w-full px-4 py-3 border rounded-lg"
            />

            <button
              type="submit"
              className="w-full bg-red-700 text-white py-3 rounded-lg font-bold hover:bg-red-800"
            >
              Create Account
            </button>
          </form>

          {/* LOGIN LINK */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-red-700 font-bold">
                Login here
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}