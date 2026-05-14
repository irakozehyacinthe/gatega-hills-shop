import { mockUsers, mockProducts } from '../data/mockData';

export function initializeData() {
  // Initialize users if not already set
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(mockUsers));
  }

  // Initialize products if not already set
  if (!localStorage.getItem('products')) {
    localStorage.setItem('products', JSON.stringify(mockProducts));
  }
}
