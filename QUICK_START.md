# QUICK START GUIDE - Admin Order Management System

## Getting Started in 5 Minutes

### Prerequisites
- PHP 8.1+
- Node.js 16+
- MySQL 5.7+
- Composer
- npm

---

## STEP 1: Database Setup (1 minute)

```bash
# Navigate to backend
cd backend

# Run migrations
php artisan migrate

# If migrations fail, try:
php artisan migrate:fresh --seed
```

**Expected Output:**
```
Migration table created successfully.
Migrated: 2024_01_01_000000_create_categories_table
Migrated: 2024_01_01_000100_create_products_table
Migrated: 2024_01_01_000200_create_users_table
Migrated: 2024_01_01_000300_create_orders_table
Migrated: 2024_01_01_000301_update_orders_table_add_new_fields
Migrated: 2024_01_01_000400_create_order_items_table
```

---

## STEP 2: Create Admin User (1 minute)

### Option A: Using artisan tinker
```bash
php artisan tinker

# In tinker shell:
User::create([
  'name' => 'Admin',
  'email' => 'admin@gategahills.com',
  'password' => bcrypt('admin123'),
  'role' => 'admin'
])

exit
```

### Option B: Direct SQL
```sql
INSERT INTO users (name, email, password, role, created_at, updated_at) 
VALUES (
  'Admin',
  'admin@gategahills.com',
  '$2y$12$...',  -- bcrypt hash of 'admin123'
  'admin',
  NOW(),
  NOW()
);
```

---

## STEP 3: Start Backend (1 minute)

```bash
# In backend directory
php artisan serve

# Should output:
# Laravel development server started: http://127.0.0.1:8000
```

Keep this terminal open!

---

## STEP 4: Start Frontend (1 minute)

In a **NEW terminal**:

```bash
# Navigate to root
cd ..

# Install dependencies (first time only)
npm install

# Start development server
npm run dev

# Should output:
# VITE v6.x.x  ready in xxx ms
# ➜ Local:   http://localhost:5173/
```

---

## STEP 5: Test Application (1 minute)

### Test Customer Checkout
1. Open browser: `http://localhost:5173`
2. Add products to cart
3. Go to Checkout
4. Fill in:
   - Full Name: John Doe
   - Phone: +250 788 123 456
   - Address: KK 123 St, Kigali
   - Message: "Call before delivery"
   - Payment: Cash on Delivery
5. Click "Place Order"
6. Should see success toast

### Test Admin Dashboard
1. Log in with:
   - Email: `admin@gategahills.com`
   - Password: `admin123`
2. Navigate to **Admin → Manage Orders**
3. Should see order you just created
4. Click **View** to see details
5. Update status from dropdown
6. See success message

---

## TROUBLESHOOTING

### "Database connection error"
```bash
# Check .env file in backend directory
cat backend/.env | grep DB_

# Should show correct MySQL credentials
# Update if needed and retry migration
```

### "CORS error"
Check `backend/config/cors.php`:
```php
'allowed_origins' => ['http://localhost:5173'],
```

### "Post not found" (404)
```bash
# Clear Laravel cache
php artisan route:cache
php artisan config:cache
php artisan view:cache
```

### "Frontend not connecting to API"
Update `src/app/services/orderService.ts`:
```typescript
const API_BASE = 'http://localhost:8000/api';
```

---

## KEY ENDPOINTS TO TEST

### User Creates Order
```bash
curl -X POST http://localhost:8000/api/orders \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "items": [{"product_id": 1, "quantity": 2}],
    "customer_name": "John Doe",
    "phone_number": "+250 788 123 456",
    "delivery_address": "KK 123 St",
    "message": "Call before delivery",
    "payment_method": "cash_on_delivery"
  }'
```

### Admin Gets Orders
```bash
curl -H "Authorization: Bearer {admin-token}" \
  http://localhost:8000/api/admin/orders
```

### Admin Updates Status
```bash
curl -X PUT http://localhost:8000/api/admin/orders/{order-id}/status \
  -H "Authorization: Bearer {admin-token}" \
  -H "Content-Type: application/json" \
  -d '{"order_status": "approved"}'
```

---

## FILE STRUCTURE

```
GATEGA HILLS SHOP/
├── backend/
│   ├── app/
│   │   ├── Events/
│   │   │   ├── OrderCreated.php         ✨ NEW
│   │   │   └── OrderStatusUpdated.php   ✨ NEW
│   │   ├── Http/Controllers/
│   │   │   └── OrderController.php      🔄 UPDATED
│   │   └── Models/
│   │       ├── Order.php                🔄 UPDATED
│   │       └── User.php                 🔄 UPDATED
│   ├── database/migrations/
│   │   └── 2024_01_01_000301_...php     ✨ NEW
│   └── routes/
│       └── api.php                      🔄 UPDATED
├── src/
│   └── app/
│       ├── pages/
│       │   └── Checkout.tsx             🔄 UPDATED
│       ├── pages/admin/
│       │   └── ManageOrders.tsx         🔄 UPDATED
│       ├── services/
│       │   └── orderService.ts          ✨ NEW
│       ├── hooks/
│       │   └── useOrderNotifications.ts ✨ NEW
│       └── types/
│           └── order.ts                 ✨ NEW
└── [docs]
    ├── ADMIN_ORDER_MANAGEMENT_GUIDE.md ✨ NEW
    └── IMPLEMENTATION_SUMMARY.md       ✨ NEW
```

---

## COMMON TASKS

### Reset Database
```bash
cd backend
php artisan migrate:fresh
```

### Clear Cache
```bash
php artisan cache:clear
php artisan config:clear
php artisan view:clear
```

### View Database Tables
```bash
# Using MySQL CLI
mysql -u root -p gatega_hills_shop
show tables;
desc orders;
```

### Check API Routes
```bash
php artisan route:list | grep admin
```

---

## ENVIRONMENT VARIABLES

### Backend (.env)
```env
APP_NAME="GATEGA HILLS SHOP"
APP_DEBUG=true

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=gatega_hills_shop
DB_USERNAME=root
DB_PASSWORD=

BROADCAST_DRIVER=database
QUEUE_CONNECTION=sync
```

### Frontend (optional .env)
```env
VITE_API_URL=http://localhost:8000/api
```

---

## BEFORE PRODUCTION

- [ ] Set `APP_DEBUG=false` in backend `.env`
- [ ] Run `npm run build` for optimized frontend
- [ ] Change admin password to secure one
- [ ] Configure real database (not localhost)
- [ ] Set up proper broadcasting (Pusher)
- [ ] Enable HTTPS
- [ ] Configure CORS properly
- [ ] Set up backup strategy
- [ ] Configure logging
- [ ] Run security audit

---

## USEFUL COMMANDS

```bash
# Backend
php artisan serve                    # Start Laravel server
php artisan migrate                  # Run migrations
php artisan tinker                   # Interactive shell
php artisan route:list               # List all routes

# Frontend
npm run dev                           # Start dev server
npm run build                         # Production build
npm install                           # Install dependencies
```

---

## GETTING HELP

- 📖 Read: `ADMIN_ORDER_MANAGEMENT_GUIDE.md`
- 📋 Check: `IMPLEMENTATION_SUMMARY.md`
- 📧 Email: hyacintheirakoze7@gmail.com
- 🐛 Issues: Check terminal output for error messages

---

## SUCCESS CHECKLIST

- [x] Database migrations completed
- [x] Admin user created
- [x] Backend running on port 8000
- [x] Frontend running on port 5173
- [x] Can log in to frontend
- [x] Can access admin panel
- [x] Can create order from checkout
- [x] Order appears in admin dashboard
- [x] Can update order status

If all ✓, you're ready to go! 🎉

---

**Last Updated:** May 14, 2026  
**Status:** Production Ready
