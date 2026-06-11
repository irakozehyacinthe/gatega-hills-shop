import { Link } from 'react-router';
import { ArrowRight, Truck, Shield, Clock, Zap, TrendingUp, Package } from 'lucide-react';
import { mockProducts, categories } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';
import {
  getBestSellerProducts,
  getDiscountedProducts,
  getFeaturedProducts,
  getFlashSaleProducts,
  getNewArrivalProducts,
  getPopularProducts,
  getRecommendedProducts,
} from '../utils/productCatalog';

export function Home() {
  const featuredProducts = getFeaturedProducts(mockProducts).slice(0, 8);
  const bestSellers = getBestSellerProducts(mockProducts).slice(0, 8);
  const newArrivals = getNewArrivalProducts(mockProducts).slice(0, 8);
  const flashSaleProducts = getFlashSaleProducts(mockProducts).slice(0, 8);
  const discountedProducts = getDiscountedProducts(mockProducts).slice(0, 8);
  const popularProducts = getPopularProducts(mockProducts);
  const recommendedProducts = getRecommendedProducts(mockProducts);


  return (
    <div>
      {/* Hero Section - Modern Supermarket */}
      <section className="bg-gradient-to-r from-green-600 to-green-500 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute w-96 h-96 bg-white rounded-full -top-48 -right-48"></div>
          <div className="absolute w-96 h-96 bg-white rounded-full -bottom-48 -left-48"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Welcome to GATEGA HILLS SHOP
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-green-50">
            Your Premium Supermarket for Quality Food, Beverages & Essentials
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition shadow-lg"
          >
            Shop Now <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-sm hover:shadow-lg transition">
              <div className="bg-green-600 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Truck className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Fast Delivery</h3>
              <p className="text-gray-600">Quick delivery on all orders</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-sm hover:shadow-lg transition">
              <div className="bg-blue-600 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Secure Shopping</h3>
              <p className="text-gray-600">100% secure checkout & payments</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl shadow-sm hover:shadow-lg transition">
              <div className="bg-purple-600 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">24/7 Support</h3>
              <p className="text-gray-600">Always available to help you</p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl shadow-sm hover:shadow-lg transition">
              <div className="bg-orange-600 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Best Prices</h3>
              <p className="text-gray-600">Great deals & special offers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">Shop by Category</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Explore our wide range of premium products</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.filter(cat => cat !== 'All').map((category) => (
              <Link
                key={category}
                to={`/products?category=${category}`}
                className="group bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 hover:scale-105 border border-gray-200"
              >
                <Package className="w-8 h-8 text-green-600 mb-3 group-hover:text-green-700" />
                <span className="font-bold text-gray-800 group-hover:text-green-600 transition">{category}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-white">

        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-800">Featured Products</h2>
              <p className="text-gray-600 mt-2">Discover our top selection</p>
            </div>
            <Link
              to="/products"
              className="text-green-600 hover:text-green-800 font-bold flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg hover:bg-green-100 transition"
            >
              View All <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-800">Best Sellers</h2>
              <p className="text-gray-600 mt-2">Customer favorites & top picks</p>
            </div>
            <Link
              to="/products"
              className="text-green-600 hover:text-green-800 font-bold flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg hover:bg-green-100 transition"
            >
              View All <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-20 bg-white">

        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-800">New Arrivals</h2>
              <p className="text-gray-600 mt-2">Check out what's new in store</p>
            </div>
            <Link
              to="/products"
              className="text-green-600 hover:text-green-800 font-bold flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg hover:bg-green-100 transition"
            >
              View All <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Flash Sale Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-800">Flash Sale</h2>
              <p className="text-gray-600 mt-2">Limited-time discounts</p>
            </div>
            <Link
              to="/products"
              className="text-green-600 hover:text-green-800 font-bold flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg hover:bg-green-100 transition"
            >
              View All <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {flashSaleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Discounted Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-800">Discounted Products</h2>
              <p className="text-gray-600 mt-2">Save more on your favorites</p>
            </div>
            <Link
              to="/products"
              className="text-green-600 hover:text-green-800 font-bold flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg hover:bg-green-100 transition"
            >
              View All <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {discountedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-800">Popular Products</h2>
              <p className="text-gray-600 mt-2">Top rated picks</p>
            </div>
            <Link
              to="/products"
              className="text-green-600 hover:text-green-800 font-bold flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg hover:bg-green-100 transition"
            >
              View All <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-800">Recommended</h2>
              <p className="text-gray-600 mt-2">Smart picks for you</p>
            </div>
            <Link
              to="/products"
              className="text-green-600 hover:text-green-800 font-bold flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg hover:bg-green-100 transition"
            >
              View All <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-500 text-white py-20">

        <div className="max-w-4xl mx-auto px-4 text-center">
          <Zap className="w-12 h-12 mx-auto mb-4 animate-pulse" />
          <h2 className="text-4xl font-bold mb-4">Special Offers & Promotions</h2>
          <p className="text-xl mb-8 text-green-50">
            Sign up today and get exclusive deals on your favorite supermarket essentials
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition shadow-lg"
          >
            Shop All Products <Zap className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
