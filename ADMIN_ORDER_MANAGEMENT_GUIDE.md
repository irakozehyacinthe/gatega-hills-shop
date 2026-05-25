# GATEGA HILLS SHOP - Admin Order Management System

## Overview

Complete professional admin order management system with customer message support, real-time notifications, and comprehensive order tracking for **GATEGA HILLS SHOP** e-commerce platform.

**Version:** 1.0.0  
**Company:** GATEGA HILLS SHOP  
**Developer:** Irakoze Hyacinthe (hyacintheirakoze7@gmail.com)  
**Company Email:** gategahills@gmail.com

---

## Features

### 1. **Enhanced Customer Checkout**
- **Customer Information Fields:**
  - Full Name
  - Phone Number
  - Delivery Address
  - Delivery Instructions/Messages
  - Payment Method Selection

- **Payment Methods:**
  - Cash on Delivery (COD)
  - Credit/Debit Card
  - Mobile Money (MTN/Airtel)
  - Bank Transfer

- **Delivery Instructions:**
  - "Please deliver fast"
  - "Call me before delivery"
  - "Deliver after 5 PM"
  - Custom instructions

### 2. **Professional Admin Dashboard**

#### Order Management Page
- **View All Orders** with customer details
- **Search Orders** by:
  - Customer name
  - Phone number
  - Order ID
  - Delivery address

- **Filter Orders** by status:
  - Pending
  - Approved
  - On Delivery
  - Delivered
  - Cancelled

- **Real-time Statistics:**
  - Total Orders
  - Pending Orders
  - Delivered Orders
  - Total Revenue

### 3. **Order Status Management**
Admin can update order status through easy dropdown:
- Pending → Approved
- Approved → On Delivery
- On Delivery → Delivered
- Cancel anytime

### 4. **Customer Communication**
- View customer phone numbers directly
- View delivery instructions from customers
- Contact customer button in modal
- All customer information in one place

### 5. **Order Details Modal**
Complete order information display:
- Customer information (name, email, phone)
- Delivery address and instructions
- Payment method and status
- Ordered products with quantities and prices
- Order total amount
- Order creation date and time

### 6. **Security Features**
- Admin-only access to order management
- Role-based access control
- Protected API endpoints
- Input validation on all forms

---

## Database Schema

### Orders Table
```sql
CREATE TABLE orders (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT FOREIGN KEY,
    customer_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    delivery_address TEXT NOT NULL,
    message TEXT NULLABLE (delivery instructions),
    payment_method VARCHAR(50) DEFAULT 'cash_on_delivery',
    order_status ENUM('pending', 'approved', 'on_delivery', 'delivered', 'cancelled'),
    payment_status ENUM('pending', 'paid', 'failed'),
    total_amount DECIMAL(10, 2),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    
    INDEX (user_id, order_status),
    INDEX (created_at)
);
```

### Fields Added
- `message` - Customer delivery instructions
- `payment_method` - Selected payment method
- `payment_status` - Payment tracking
- `order_status` - New enum values

---

## API Endpoints

### Customer Routes

#### Place Order
```
POST /api/orders
Authorization: Bearer {token}

{
  "items": [
    {
      "product_id": 1,
      "quantity": 2
    }
  ],
  "customer_name": "John Doe",
  "phone_number": "+250 7XX XXX XXX",
  "delivery_address": "KK 123 St, Kigali",
  "message": "Please call before delivery",
  "payment_method": "cash_on_delivery"
}
```

#### Get User's Orders
```
GET /api/orders?per_page=10&order_status=pending
Authorization: Bearer {token}
```

#### View Order Details
```
GET /api/orders/{orderId}
Authorization: Bearer {token}
```

### Admin Routes

#### Get All Orders
```
GET /api/admin/orders?per_page=15&order_status=pending&search=john
Authorization: Bearer {token} (Admin only)

Query Parameters:
- per_page: Items per page (default: 15)
- order_status: Filter by status (pending, approved, on_delivery, delivered, cancelled)
- search: Search by customer name, phone, address
```

#### Get Order Statistics
```
GET /api/admin/orders/stats
Authorization: Bearer {token} (Admin only)

Response:
{
  "total_orders": 150,
  "pending_orders": 25,
  "delivered_orders": 120,
  "total_revenue": 5000000
}
```

#### Update Order Status
```
PUT /api/admin/orders/{orderId}/status
Authorization: Bearer {token} (Admin only)

{
  "order_status": "approved",
  "payment_status": "paid"
}
```

---

## Frontend Components

### Checkout Component
**File:** `src/app/pages/Checkout.tsx`

Features:
- Multi-step form with customer data
- Payment method selection with icons
- Delivery instructions textarea
- Real-time order summary
- Loading states
- Error handling

### Admin Order Management
**File:** `src/app/pages/admin/ManageOrders.tsx`

Features:
- Orders table with sorting
- Search and filter functionality
- Statistics cards
- Order details modal
- Status update dropdown
- Responsive design

---

## Backend Implementation

### Models

#### Order Model
**File:** `backend/app/Models/Order.php`

Methods:
- `items()` - OrderItem relationship
- `user()` - Customer relationship
- `products()` - Product through OrderItems
- `scopeByStatus()` - Filter by status
- `scopeForAdmin()` - Admin scope
- `getStatusColorAttribute()` - Status badge color

#### User Model
Updated with:
- `is_admin` accessor (returns boolean)
- `orders()` relationship
- `isAdmin()` method

### Controllers

#### OrderController
**File:** `backend/app/Http/Controllers/OrderController.php`

Methods:
- `index()` - List user's orders
- `store()` - Create new order with all fields
- `show()` - View order details
- `updateStatus()` - Admin: Change order status
- `adminIndex()` - Admin: Get all orders with filtering
- `adminGetStats()` - Admin: Get statistics

### Database Migrations

**Migration:**
`backend/database/migrations/2024_01_01_000301_update_orders_table_add_new_fields.php`

Changes:
- Add `user_id` foreign key
- Add `payment_method` column
- Add `message` column
- Add `payment_status` enum
- Add `order_status` enum values
- Create indexes for performance

---

## Real-time Notifications

### Events

#### OrderCreated Event
**File:** `backend/app/Events/OrderCreated.php`

Broadcasting:
- Channel: `orders` (public)
- Channel: `admin-notifications` (for all admins)
- Event: `order.created`

Data:
```json
{
  "id": "123",
  "customer_name": "John Doe",
  "total_amount": 50000,
  "notification": "New order from John Doe! 🎉"
}
```

#### OrderStatusUpdated Event
**File:** `backend/app/Events/OrderStatusUpdated.php`

Broadcasting:
- Private channel: `orders.{userId}` (customer)
- Channel: `orders` (public)
- Channel: `admin-notifications` (admins)
- Event: `order.status.updated`

Data:
```json
{
  "id": "123",
  "customer_name": "John Doe",
  "order_status": "approved",
  "notification": "Your order #123 is now approved! 📦"
}
```

### Frontend Hook
**File:** `src/app/hooks/useOrderNotifications.ts`

Hooks:
- `useOrderNotifications()` - Listen for general order events
- `useAdminOrderNotifications()` - Listen for admin notifications

---

## Implementation Checklist

- [x] Database migrations
- [x] Order model updates
- [x] OrderController enhancements
- [x] API routes configuration
- [x] Enhanced checkout form
- [x] Admin order management page
- [x] Statistics dashboard
- [x] Event broadcasting setup
- [x] User model updates
- [x] Admin middleware verification

---

## Setup Instructions

### 1. Database Migration
```bash
cd backend
php artisan migrate
```

### 2. Update Environment
Ensure `.env` has correct database and API settings:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=gatega_hills_shop
DB_USERNAME=root
DB_PASSWORD=

BROADCAST_DRIVER=database
# or use 'pusher' for real-time with Pusher
```

### 3. Build Frontend
```bash
npm run build
```

### 4. Start Backend
```bash
cd backend
php artisan serve
```

---

## Testing

### Test Order Creation
1. Navigate to `/checkout`
2. Fill in all customer information
3. Select payment method
4. Add delivery instructions
5. Click "Place Order"

### Test Admin Panel
1. Log in with admin account
2. Go to Admin → Order Management
3. View orders and their details
4. Update order status
5. Search and filter orders

### Test API
```bash
# Create order
curl -X POST http://localhost:8000/api/orders \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{...order data...}'

# Get admin orders
curl http://localhost:8000/api/admin/orders \
  -H "Authorization: Bearer {admin-token}"

# Update status
curl -X PUT http://localhost:8000/api/admin/orders/{id}/status \
  -H "Authorization: Bearer {admin-token}" \
  -H "Content-Type: application/json" \
  -d '{"order_status":"approved"}'
```

---

## Security Considerations

1. **Admin Routes:** All admin endpoints protected with `AdminMiddleware`
2. **Input Validation:** Server-side validation on all inputs
3. **Authorization:** Check user ownership and admin role
4. **CORS:** Configure CORS for frontend domain
5. **Rate Limiting:** Implement rate limiting on API endpoints
6. **Data Privacy:** Customer data only visible to admin and owner

---

## Styling

Uses **Tailwind CSS** with professional colors:
- Primary: Red (#DC2626)
- Success: Green (#16A34A)
- Warning: Yellow (#EAB308)
- Error: Red (#DC2626)
- Status badges with color-coded indicators

---

## Browser Support

- Chrome/Edge: ✅
- Firefox: ✅
- Safari: ✅
- Mobile browsers: ✅ (Responsive design)

---

## Performance Optimizations

- Database indexes on `user_id`, `order_status`, `created_at`
- Pagination for orders list (15 per page)
- Eager loading relationships
- Cached statistics
- SVG icons (Lucide React)

---

## Future Enhancements

1. **Real-time WebSocket Integration**
   - Socket.io for live order updates
   - Admin notification badges
   - Live chat with customers

2. **Advanced Reports**
   - Sales reports
   - Customer analytics
   - Delivery time analysis

3. **SMS/Email Notifications**
   - Order confirmation SMS
   - Status update emails
   - Delivery tracking link

4. **Payment Integration**
   - Stripe/PayPal integration
   - Mobile money APIs
   - Invoice generation

5. **Delivery Management**
   - Delivery person assignment
   - GPS tracking
   - Delivery proof (photo)

6. **Customer Portal**
   - Order tracking
   - Delivery status map
   - Feedback form

---

## Troubleshooting

### Issue: Admin can't see orders
**Solution:** Ensure user has `role = 'admin'` in database

### Issue: Checkout form not submitting
**Solution:** Check `auth_token` in localStorage and API endpoint

### Issue: Notifications not showing
**Solution:** Ensure broadcasting is configured and WebSocket server is running

### Issue: Delivery instructions not saving
**Solution:** Check `message` field in migration and Order fillable array

---

## Support & Contact

**Developer:** Irakoze Hyacinthe  
**Email:** hyacintheirakoze7@gmail.com  
**Company Email:** gategahills@gmail.com  
**Company:** GATEGA HILLS SHOP

---

## Version History

- **v1.0.0** - Initial release
  - Admin order management
  - Customer messaging
  - Order status tracking
  - Real-time notifications setup
  - Professional UI/UX

---

**Last Updated:** May 14, 2026
