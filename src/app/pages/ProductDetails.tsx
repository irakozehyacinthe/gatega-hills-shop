import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { ArrowLeft, ShoppingCart, Minus, Plus } from 'lucide-react';
import { mockProducts } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

export function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = mockProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Product not found
          </h2>

          <Link
            to="/products"
            className="text-blue-600 hover:text-blue-800 font-bold"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${quantity} x ${product.name} added to cart!`);
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">

            {/* Product Image */}
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover rounded-xl shadow-sm"
              />
            </div>

            {/* Product Info */}
            <div className="space-y-6">

              <div>
                <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold mb-3">
                  {product.category}
                </span>

                <h1 className="text-4xl font-bold mb-4 text-gray-800">
                  {product.name}
                </h1>

                <p className="text-gray-600 text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Price */}
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                <div className="text-5xl font-bold text-blue-600 mb-3">
                  ${product.price.toFixed(2)}
                </div>

                <div className="text-sm">
                  {product.stock > 0 ? (
                    <span className="text-green-600 font-bold text-lg">
                      ✓ In Stock ({product.stock} available)
                    </span>
                  ) : (
                    <span className="text-red-600 font-bold text-lg">
                      ✗ Out of Stock
                    </span>
                  )}
                </div>
              </div>

              {/* Quantity */}
              {product.stock > 0 && (
                <div>
                  <label className="block font-bold mb-3 text-gray-800">
                    Quantity
                  </label>

                  <div className="flex items-center gap-4">

                    <div className="flex items-center border-2 border-gray-300 rounded-lg">

                      <button
                        onClick={decrementQuantity}
                        className="p-3 hover:bg-gray-100"
                        disabled={quantity <= 1}
                      >
                        <Minus className="w-5 h-5" />
                      </button>

                      <span className="px-6 font-bold text-xl">
                        {quantity}
                      </span>

                      <button
                        onClick={incrementQuantity}
                        className="p-3 hover:bg-gray-100"
                        disabled={quantity >= product.stock}
                      >
                        <Plus className="w-5 h-5" />
                      </button>

                    </div>

                    <span className="text-gray-700 font-semibold">
                      Subtotal:
                      <span className="text-blue-600 text-lg ml-2">
                        ${(product.price * quantity).toFixed(2)}
                      </span>
                    </span>

                  </div>
                </div>
              )}

              {/* Add To Cart */}
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-bold text-lg transition flex items-center justify-center gap-2 disabled:bg-gray-400"
              >
                <ShoppingCart className="w-6 h-6" />
                Add to Cart
              </button>

              {/* Product Details */}
              <div className="border-t pt-6">

                <h3 className="font-bold mb-4 text-gray-800 text-lg">
                  Product Information
                </h3>

                <div className="space-y-3 text-gray-600">

                  <div className="flex justify-between">
                    <span>Category:</span>
                    <span className="font-semibold text-gray-800">
                      {product.category}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Product ID:</span>
                    <span className="font-semibold text-gray-800">
                      {product.id}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Price:</span>
                    <span className="font-semibold text-blue-600">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Availability:</span>
                    <span className="font-bold">
                      {product.stock > 0
                        ? 'In Stock'
                        : 'Out of Stock'}
                    </span>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}