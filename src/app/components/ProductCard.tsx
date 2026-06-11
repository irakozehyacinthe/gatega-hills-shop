import { Link } from 'react-router';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../data/mockData';

function formatRwf(amount: number) {
  // Keep simple formatting (no decimals)
  return `${Math.round(amount).toLocaleString('en-RW')} RWF`;
}

import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition duration-300 hover:scale-105 border border-gray-200 flex flex-col h-full group">
      <Link to={`/products/${product.id}`} className="flex-grow">
        <div className="relative overflow-hidden rounded-lg mb-4 h-48">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
          />
          {product.stock <= 10 && product.stock > 0 && (
            <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold">
              Low Stock
            </div>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Out of Stock</span>
            </div>
          )}
        </div>
      </Link>
      
      <div className="space-y-2 flex-grow flex flex-col">
        <Link to={`/products/${product.id}`}>
          <h3 className="font-bold text-lg hover:text-green-600 transition line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm line-clamp-2">{product.shortDescription || product.description}</p>

        
        <div className="space-y-2 pt-2 mt-auto">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-sm text-gray-600 line-clamp-1">{product.brand}</div>
              <div className="text-xs text-gray-500">SKU: {product.sku}</div>
            </div>

            <div className="text-right">
              <div className="flex items-center justify-end gap-2">
                {typeof product.discountPrice === 'number' && product.discountPrice < product.price ? (
                  <span className="text-xs font-bold text-gray-400 line-through">
                    {formatRwf(product.price)}
                  </span>
                ) : null}
                <span className="text-lg font-bold text-green-600">
                  {formatRwf(typeof product.discountPrice === 'number' ? product.discountPrice : product.price)}
                </span>
              </div>

              <div className="text-xs text-gray-500">
                Rating: <span className="font-semibold text-gray-700">{product.rating.toFixed(1)}</span> ★
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-3 py-2 rounded-lg transition flex items-center gap-1 shadow-md flex-1 justify-center"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="text-sm">Add</span>
            </button>
          </div>

          {typeof product.discountPrice === 'number' && product.discountPrice < product.price ? (
            <div className="text-xs font-bold text-orange-600">
              Save {formatRwf(product.price - product.discountPrice)}
            </div>
          ) : null}
        </div>

        
        <div className="text-sm text-gray-500">
          {product.stock > 0 ? (
            <span className="text-green-600 font-semibold">In Stock ({product.stock})</span>
          ) : (
            <span className="text-red-600 font-semibold">Out of Stock</span>
          )}

        </div>
      </div>
    </div>
  );
}
