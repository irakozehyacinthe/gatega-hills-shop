import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import { Phone, MapPin, Package, DollarSign } from 'lucide-react';

export function Checkout() {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    customer_name: user?.name || '',
    phone_number: user?.phone || '',
    delivery_address: user?.address || '',
    message: '',
    payment_method: 'cash_on_delivery',
  });

  const deliveryFee = 5.00;
  const subtotal = getCartTotal();
  const total = subtotal + deliveryFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error('Please login to place an order');
      navigate('/login');
      return;
    }

    if (!formData.customer_name || !formData.phone_number || !formData.delivery_address) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      // Prepare order data
      const orderData = {
        items: cart.map(item => ({
          product_id: item.product.id,
          quantity: item.quantity,
        })),
        customer_name: formData.customer_name,
        phone_number: formData.phone_number,
        delivery_address: formData.delivery_address,
        message: formData.message || null,
        payment_method: formData.payment_method,
      };

      // Call backend API
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to place order');
      }

      const result = await response.json();

      // Clear cart and show success
      clearCart();
      toast.success('Order placed successfully! 🎉');
      navigate(`/orders/${result.order.id}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">Add items before checking out</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Customer Information Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Information Card */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-6 h-6 text-red-600" />
                <h2 className="text-2xl font-bold text-gray-800">Delivery Information</h2>
              </div>
              
              <form onSubmit={handlePlaceOrder} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="customer_name"
                    value={formData.customer_name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Phone Number *</label>
                  <div className="flex gap-2">
                    <Phone className="w-5 h-5 text-gray-400 mt-3.5" />
                    <input
                      type="tel"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleInputChange}
                      required
                      placeholder="+250 7XX XXX XXX"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                    />
                  </div>
                </div>

                {/* Delivery Address */}
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Delivery Address *</label>
                  <textarea
                    name="delivery_address"
                    value={formData.delivery_address}
                    onChange={handleInputChange}
                    required
                    placeholder="Street address, building, house number, etc."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition resize-none"
                  />
                </div>

                {/* Delivery Instructions */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <label className="block font-semibold text-gray-700 mb-2">Delivery Instructions (Optional)</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="e.g., 'Please deliver after 5 PM', 'Call before delivery', 'Leave with security guard', etc."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none bg-white"
                  />
                  <p className="text-xs text-gray-600 mt-2">Add any special instructions for the delivery driver</p>
                </div>

                {/* Payment Method */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <label className="block font-semibold text-gray-700 mb-3">Payment Method *</label>
                  <div className="space-y-2">
                    {[
                      { value: 'cash_on_delivery', label: '💰 Cash on Delivery' },
                      { value: 'card', label: '💳 Credit/Debit Card' },
                      { value: 'mobile_money', label: '📱 Mobile Money (MTN/Airtel)' },
                      { value: 'bank_transfer', label: '🏦 Bank Transfer' },
                    ].map(method => (
                      <label key={method.value} className="flex items-center gap-3 cursor-pointer p-2 hover:bg-white rounded transition">
                        <input
                          type="radio"
                          name="payment_method"
                          value={method.value}
                          checked={formData.payment_method === method.value}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-red-600 focus:ring-red-500"
                        />
                        <span className="text-gray-700">{method.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-xl font-bold text-lg hover:from-red-700 hover:to-red-800 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : 'Place Order'}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 sticky top-24">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-green-600" />
                Order Summary
              </h2>

              {/* Product List */}
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex gap-4 pb-4 border-b hover:bg-gray-50 p-2 rounded transition">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 text-sm">{item.product.name}</h4>
                      <p className="text-xs text-gray-600">
                        {item.quantity} × ${item.product.price.toFixed(2)}
                      </p>
                      <p className="font-bold text-green-600">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-4"></div>

              {/* Totals */}
              <div className="space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Delivery Fee</span>
                  <span className="font-semibold">${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-300 pt-3">
                  <div className="flex justify-between text-lg">
                    <span className="font-bold text-gray-800">Total</span>
                    <span className="font-bold text-2xl text-red-600">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4 text-xs text-blue-800">
                ✓ Order will be confirmed once payment is processed
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
