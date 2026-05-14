import { Link } from 'react-router';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../data/mockData';
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
        
        <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between pt-2 mt-auto">
          <span className="text-2xl font-bold text-green-600">
            ${product.price.toFixed(2)}
          </span>
          
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-3 py-2 rounded-lg transition flex items-center gap-1 shadow-md"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="text-sm">Add</span>
          </button>
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
