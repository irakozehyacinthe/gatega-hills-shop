// Mock wishlist utilities/UI hook.
// Replace later with backend API integration or global state.

import { toast } from 'sonner';
import type { Product } from '../data/mockData';

const wishlist = new Set<string>();

export function isWishlisted(productId: string) {
  return wishlist.has(productId);
}

export function toggleWishlist(product: Product) {
  const willAdd = !wishlist.has(product.id);
  if (willAdd) wishlist.add(product.id);
  else wishlist.delete(product.id);

  toast.success(willAdd ? 'Added to wishlist!' : 'Removed from wishlist!');
}

