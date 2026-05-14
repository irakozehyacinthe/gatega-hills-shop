import { Link } from 'react-router';
import { Phone, Mail, Facebook, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-green-400">🛒 GATEGA HILLS SHOP</h3>
            <p className="text-gray-400 leading-relaxed">
              Your premium supermarket for quality food, beverages, and household essentials. Shop with confidence and convenience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-lg text-white">Shop</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-gray-400 hover:text-green-400 transition font-medium">
                Home
              </Link>
              <Link to="/products" className="text-gray-400 hover:text-green-400 transition font-medium">
                All Products
              </Link>
              <Link to="/products?category=Food%20%26%20Kitchen" className="text-gray-400 hover:text-green-400 transition font-medium">
                Food & Kitchen
              </Link>
              <Link to="/products?category=Beverages" className="text-gray-400 hover:text-green-400 transition font-medium">
                Beverages
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold mb-4 text-lg text-white">Support</h4>
            <div className="flex flex-col gap-2">
              <Link to="/cart" className="text-gray-400 hover:text-green-400 transition font-medium">
                Shopping Cart
              </Link>
              <a href="#" className="text-gray-400 hover:text-green-400 transition font-medium">
                FAQ
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition font-medium">
                Shipping Info
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition font-medium">
                Returns
              </a>
            </div>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-bold mb-4 text-lg text-white">Contact</h4>
            <div className="flex flex-col gap-3 text-gray-400 mb-6">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-green-400" />
                <span>0783943423</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-green-400" />
                <span>gategahills@gmail.com</span>
              </div>
            </div>
            <h4 className="font-bold mb-3 text-white">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-green-400 hover:bg-gray-700 transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-green-400 hover:bg-gray-700 transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-green-400 hover:bg-gray-700 transition">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-6">
            <div className="text-center md:text-left text-gray-400">
              <p>&copy; 2026 GATEGA HILLS SHOP. All rights reserved.</p>
            </div>
            <div className="flex justify-center md:justify-end gap-4 text-sm text-gray-500">
              <a href="#" className="hover:text-green-400 transition">Privacy Policy</a>
              <a href="#" className="hover:text-green-400 transition">Terms of Service</a>
              <a href="#" className="hover:text-green-400 transition">Cookie Policy</a>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-4">
            <p className="text-center text-sm text-gray-500">
              Developed by <span className="font-semibold text-gray-400">IRAKOZE Hyacinthe</span> • 
              <a href="mailto:hyacintheirakoze7@gmail.com" className="ml-2 hover:text-green-400 transition">hyacintheirakoze7@gmail.com</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
