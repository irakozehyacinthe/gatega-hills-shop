// Mock data for the GATEGA HILLS SHOP

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  phone: string;
  address: string;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  sku: string;

  shortDescription: string;
  description: string;

  price: number; // Original price (RWF)
  discountPrice?: number; // Discount price (RWF)

  stock: number;
  rating: number; // 0-5

  image: string;
  images: string[];

  isFeatured: boolean;
  isBestSeller: boolean;
  isNewArrival: boolean;

  created_at: string;
}


export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
}

export interface Order {
  id: string;
  user_id: string;
  total_price: number;
  status: 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled';
  delivery_address: string;
  created_at: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'user@gategahills.com',
    password: 'user123',
    role: 'user',
    phone: '555-1234',
    address: '123 Main St, City, State',
    created_at: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@gategahills.com',
    password: 'admin123',
    role: 'admin',
    phone: '555-5678',
    address: '456 Admin Ave, City, State',
    created_at: '2024-01-10T10:00:00Z',
  },
];

// Mock Products - Supermarket Collection
export const mockProducts: Product[] = [
  // FOOD & KITCHEN
  {
    id: '1',
    name: 'Premium Basmati Rice',
    description: 'High-quality long-grain basmati rice - 2kg bag, perfect for aromatic rice dishes',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500',
    category: 'Food & Kitchen',
    stock: 45,
    created_at: '2024-01-20T10:00:00Z',
  },
  {
    id: '2',
    name: 'All-Purpose Flour',
    description: 'Premium all-purpose flour - 5kg pack, ideal for baking and cooking',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1587599810694-30a9cb38d3fe?w=500',
    category: 'Food & Kitchen',
    stock: 60,
    created_at: '2024-01-20T10:00:00Z',
  },
  {
    id: '3',
    name: 'Pure Cooking Oil',
    description: 'Pure vegetable cooking oil - 2L bottle, cold-pressed and refined',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=500',
    category: 'Food & Kitchen',
    stock: 35,
    created_at: '2024-01-20T10:00:00Z',
  },
  {
    id: '4',
    name: 'Brown Sugar',
    description: 'Pure brown sugar - 1kg bag, naturally sweet and perfect for baking',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1599599810694-c84b2aff4c00?w=500',
    category: 'Food & Kitchen',
    stock: 50,
    created_at: '2024-01-20T10:00:00Z',
  },
  {
    id: '5',
    name: 'Premium Tea Leaves',
    description: 'Loose leaf black tea - 250g package, aromatic and full-flavored',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1597318130925-df33e7b3f9e1?w=500',
    category: 'Food & Kitchen',
    stock: 40,
    created_at: '2024-01-20T10:00:00Z',
  },
  {
    id: '6',
    name: 'Ground Coffee Beans',
    description: 'Premium ground coffee - 500g bag, freshly roasted and aromatic',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b3f4?w=500',
    category: 'Food & Kitchen',
    stock: 55,
    created_at: '2024-01-20T10:00:00Z',
  },
  {
    id: '7',
    name: 'Spice Mix Combo',
    description: 'Assorted spices pack - 6 varieties, including turmeric, cumin, coriander',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1596040306223-4a6d7f84a3db?w=500',
    category: 'Food & Kitchen',
    stock: 38,
    created_at: '2024-01-20T10:00:00Z',
  },
  {
    id: '8',
    name: 'Pasta Pack',
    description: 'Premium pasta - 500g pack, includes spaghetti, penne, and shells',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500',
    category: 'Food & Kitchen',
    stock: 70,
    created_at: '2024-01-20T10:00:00Z',
  },
  {
    id: '9',
    name: 'Instant Noodles',
    description: 'Quick cooking noodles - pack of 4, various flavors available',
    price: 1.49,
    image: 'https://images.unsplash.com/photo-1626082561406-4a2f00c9f3cf?w=500',
    category: 'Food & Kitchen',
    stock: 100,
    created_at: '2024-01-20T10:00:00Z',
  },
  {
    id: '10',
    name: 'Mixed Snack Box',
    description: 'Assorted snacks - includes chips, crackers, and nuts',
    price: 5.49,
    image: 'https://images.unsplash.com/photo-1599599810694-f0a30ac94f67?w=500',
    category: 'Food & Kitchen',
    stock: 42,
    created_at: '2024-01-20T10:00:00Z',
  },
  // BEVERAGES
  {
    id: '11',
    name: 'Orange Juice 1L',
    description: '100% pure orange juice - 1L bottle, fresh and natural',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd1f3033?w=500',
    category: 'Beverages',
    stock: 48,
    created_at: '2024-01-20T10:00:00Z',
  },
  {
    id: '12',
    name: 'Mineral Water 6-Pack',
    description: 'Purified mineral water - 1.5L bottles pack, refreshing and hydrating',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1599599810694-13f31e12f6b0?w=500',
    category: 'Beverages',
    stock: 65,
    created_at: '2024-01-20T10:00:00Z',
  },
  {
    id: '13',
    name: 'Cola Soft Drink',
    description: 'Classic cola drink - 2L bottle, carbonated and refreshing',
    price: 2.49,
    image: 'https://images.unsplash.com/photo-1554866585-8c63b5a00d98?w=500',
    category: 'Beverages',
    stock: 55,
    created_at: '2024-01-20T10:00:00Z',
  },
  {
    id: '14',
    name: 'Fresh Milk',
    description: 'Full-fat fresh milk - 1L bottle, rich and creamy',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1586252260521-ccb7ee52daf2?w=500',
    category: 'Beverages',
    stock: 40,
    created_at: '2024-01-20T10:00:00Z',
  },
  {
    id: '15',
    name: 'Iced Tea Mix',
    description: 'Ready-to-mix iced tea - 500ml, perfect for hot days',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1597318130925-df33e7b3f9e1?w=500',
    category: 'Beverages',
    stock: 32,
    created_at: '2024-01-20T10:00:00Z',
  },
  {
    id: '16',
    name: 'Energy Drink',
    description: 'Power boost energy drink - 250ml can, packed with vitamins',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500',
    category: 'Beverages',
    stock: 58,
    created_at: '2024-01-20T10:00:00Z',
  },
  {
    id: '17',
    name: 'Premium Beer 6-Pack',
    description: 'Craft beer selection - 6 bottles, various flavors and strengths',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1574865569407-3ce1588b9e0d?w=500',
    category: 'Beverages',
    stock: 25,
    created_at: '2024-01-20T10:00:00Z',
  },
  {
    id: '18',
    name: 'Red Wine Bottle',
    description: 'Premium red wine - 750ml bottle, smooth and rich flavor',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500',
    category: 'Beverages',
    stock: 20,
    created_at: '2024-01-20T10:00:00Z',
  },
  {
    id: '19',
    name: 'Whiskey',
    description: 'Premium whiskey - 750ml bottle, aged and smooth',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1608651985730-8415877868d1?w=500',
    category: 'Beverages',
    stock: 15,
    created_at: '2024-01-20T10:00:00Z',
  },
  {
    id: '20',
    name: 'Vodka',
    description: 'Pure vodka - 750ml bottle, crystal clear and smooth',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1551751431-d21aad2c4020?w=500',
    category: 'Beverages',
    stock: 18,
    created_at: '2024-01-20T10:00:00Z',
  },
  // HOUSEHOLD & CLEANING
  {
    id: '21',
    name: 'Bath Soap Pack',
    description: 'Premium bath soap - pack of 4 bars, gentle and moisturizing',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1600273165169-0903f3d51b04?w=500',
    category: 'Household & Cleaning',
    stock: 52,
    created_at: '2024-01-20T10:00:00Z',
  },
  {
    id: '22',
    name: 'Laundry Detergent',
    description: 'Powerful detergent - 2kg, removes tough stains effectively',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1600273166081-89a8a66ee330?w=500',
    category: 'Household & Cleaning',
    stock: 44,
    created_at: '2024-01-20T10:00:00Z',
  },
  {
    id: '23',
    name: 'Laundry Powder',
    description: 'Washing powder - 1kg pack, white and colored clothes safe',
    price: 5.49,
    image: 'https://images.unsplash.com/photo-1600273174642-ba7e6e34e0a5?w=500',
    category: 'Household & Cleaning',
    stock: 60,
    created_at: '2024-01-20T10:00:00Z',
  },
  {
    id: '24',
    name: 'Dishwashing Liquid',
    description: 'Grease-cutting dish soap - 500ml, leaves dishes sparkling',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1600273195556-e8c20351eeca?w=500',
    category: 'Household & Cleaning',
    stock: 68,
    created_at: '2024-01-20T10:00:00Z',
  },
  {
    id: '25',
    name: 'Toilet Cleaner',
    description: 'Powerful toilet cleaner - 750ml, kills 99% of germs',
    price: 4.49,
    image: 'https://images.unsplash.com/photo-1600273221487-4e3212a1614a?w=500',
    category: 'Household & Cleaning',
    stock: 36,
    created_at: '2024-01-20T10:00:00Z',
  },
  {
    id: '26',
    name: 'Air Freshener Spray',
    description: 'Fresh scent air freshener - 300ml spray, long-lasting fragrance',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1600273211681-c88c039b9f13?w=500',
    category: 'Household & Cleaning',
    stock: 54,
    created_at: '2024-01-20T10:00:00Z',
  },
  {
    id: '27',
    name: 'Tissue Paper Pack',
    description: 'Soft tissue paper - 4-pack rolls, gentle and strong',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1600273195637-b52be1a91b0f?w=500',
    category: 'Household & Cleaning',
    stock: 75,
    created_at: '2024-01-20T10:00:00Z',
  },
  {
    id: '28',
    name: 'Cleaning Tools Set',
    description: 'Complete cleaning set - includes brush, mop, and cloth',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1600273212836-3b62a88dfdbe?w=500',
    category: 'Household & Cleaning',
    stock: 28,
    created_at: '2024-01-20T10:00:00Z',
  },
  // PERSONAL CARE
  {
    id: '29',
    name: 'Body Lotion 250ml',
    description: 'Moisturizing body lotion - 250ml, nourishes and softens skin',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1600273195670-71fa90e87a9f?w=500',
    category: 'Personal Care',
    stock: 46,
    created_at: '2024-01-20T10:00:00Z',
  },
  {
    id: '30',
    name: 'Perfume Spray',
    description: 'Luxury perfume - 100ml spray, elegant and long-lasting scent',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1600273223556-2b8e1e69dbd8?w=500',
    category: 'Personal Care',
    stock: 34,
    created_at: '2024-01-20T10:00:00Z',
  },
  {
    id: '31',
    name: 'Shampoo 400ml',
    description: 'Hair shampoo - 400ml bottle, cleanses and conditions hair',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1600273195610-8e5e310f10b8?w=500',
    category: 'Personal Care',
    stock: 52,
    created_at: '2024-01-20T10:00:00Z',
  },
  {
    id: '32',
    name: 'Toothpaste 100ml',
    description: 'Mint toothpaste - 100ml tube, whitens and protects teeth',
    price: 2.49,
    image: 'https://images.unsplash.com/photo-1600273198063-c3b5c5c9bfbd?w=500',
    category: 'Personal Care',
    stock: 70,
    created_at: '2024-01-20T10:00:00Z',
  },
  {
    id: '33',
    name: 'Body Spray 200ml',
    description: 'Fresh body spray - 200ml can, deodorant and fragrance',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1600273201893-e7f4f57b8f78?w=500',
    category: 'Personal Care',
    stock: 58,
    created_at: '2024-01-20T10:00:00Z',
  },
  {
    id: '34',
    name: 'Skincare Kit',
    description: 'Complete skincare routine - includes cleanser, toner, moisturizer',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1600273213552-eb5a29b568e5?w=500',
    category: 'Personal Care',
    stock: 26,
    created_at: '2024-01-20T10:00:00Z',
  },
  {
    id: '35',
    name: 'Hair Oil 200ml',
    description: 'Nourishing hair oil - 200ml bottle, strengthens and shines',
    price: 4.49,
    image: 'https://images.unsplash.com/photo-1600273188193-9f3c49ee9c0f?w=500',
    category: 'Personal Care',
    stock: 48,
    created_at: '2024-01-20T10:00:00Z',
  },
  // STATIONERY
  {
    id: '36',
    name: 'Exercise Books Pack',
    description: 'Notebooks pack - 3 pieces, 100 pages each, ruled lines',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1554995207-c18231b6ce48?w=500',
    category: 'Stationery',
    stock: 65,
    created_at: '2024-01-20T10:00:00Z',
  },
  {
    id: '37',
    name: 'Pen Set 10pc',
    description: 'Ballpoint pen set - 10 assorted colors, smooth writing',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1591992351234-c3fd41bcc862?w=500',
    category: 'Stationery',
    stock: 55,
    created_at: '2024-01-20T10:00:00Z',
  },
  {
    id: '38',
    name: 'Pencil Pack',
    description: 'Wooden pencils - pack of 12, HB grade for sketching',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1605497787858-ac2b3b592d5f?w=500',
    category: 'Stationery',
    stock: 72,
    created_at: '2024-01-20T10:00:00Z',
  },
  {
    id: '39',
    name: 'Wooden Ruler 30cm',
    description: 'Measuring ruler - 30cm, clear markings and durable',
    price: 1.49,
    image: 'https://images.unsplash.com/photo-1599423244036-a1ae8b2a3f5c?w=500',
    category: 'Stationery',
    stock: 50,
    created_at: '2024-01-20T10:00:00Z',
  },
  {
    id: '40',
    name: 'Eraser Pack',
    description: 'Pencil erasers - pack of 5, perfect for school and office',
    price: 1.99,
    image: 'https://images.unsplash.com/photo-1599423244036-a1ae8b2a3f5c?w=500',
    category: 'Stationery',
    stock: 80,
    created_at: '2024-01-20T10:00:00Z',
  },
  {
    id: '41',
    name: 'Notebook A4',
    description: 'Standard notebook - A4 size, 200 pages, lined',
    price: 2.49,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3af5d1d9?w=500',
    category: 'Stationery',
    stock: 60,
    created_at: '2024-01-20T10:00:00Z',
  },
  {
    id: '42',
    name: 'Scientific Calculator',
    description: 'Advanced calculator - 240+ functions, perfect for students',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=500',
    category: 'Stationery',
    stock: 38,
    created_at: '2024-01-20T10:00:00Z',
  },
  {
    id: '43',
    name: 'School Materials Bundle',
    description: 'Complete school set - includes pens, pencils, ruler, eraser, notebook',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500',
    category: 'Stationery',
    stock: 42,
    created_at: '2024-01-20T10:00:00Z',
  },
  // GENERAL ITEMS
  {
    id: '44',
    name: 'Phone Charger Cable',
    description: 'USB-C charging cable - 2m, fast charging compatible',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1609034227505-5876f6aa4e90?w=500',
    category: 'General Items',
    stock: 68,
    created_at: '2024-01-20T10:00:00Z',
  },
  {
    id: '45',
    name: 'Wireless Earbuds',
    description: 'True wireless earbuds - Bluetooth 5.0, noise cancelling',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    category: 'General Items',
    stock: 32,
    created_at: '2024-01-20T10:00:00Z',
  },
  {
    id: '46',
    name: 'Power Bank 20000mAh',
    description: 'Portable charger - 20000mAh, fast charging technology',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500',
    category: 'General Items',
    stock: 44,
    created_at: '2024-01-20T10:00:00Z',
  },
  {
    id: '47',
    name: 'USB Hub',
    description: '4-port USB hub - compact design, high-speed data transfer',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1609034227505-09815de687d8?w=500',
    category: 'General Items',
    stock: 40,
    created_at: '2024-01-20T10:00:00Z',
  },
  {
    id: '48',
    name: 'LED Desk Lamp',
    description: 'Adjustable desk lamp - LED, energy-efficient, 3 brightness levels',
    price: 11.99,
    image: 'https://images.unsplash.com/photo-1565636192335-14c46fa1120d?w=500',
    category: 'General Items',
    stock: 28,
    created_at: '2024-01-20T10:00:00Z',
  },
  {
    id: '49',
    name: 'Home Organizer Set',
    description: 'Storage organizers - set of 3, for kitchen and home',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1584622181563-430f63602d4b?w=500',
    category: 'General Items',
    stock: 36,
    created_at: '2024-01-20T10:00:00Z',
  },
  {
    id: '50',
    name: 'Handy Tool Kit',
    description: 'Basic tools set - hammer, screwdrivers, nails, and more',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500',
    category: 'General Items',
    stock: 24,
    created_at: '2024-01-20T10:00:00Z',
  },
];

// Categories
export const categories = [
  'All',
  'Food & Kitchen',
  'Beverages',
  'Household & Cleaning',
  'Personal Care',
  'Stationery',
  'General Items',
];
