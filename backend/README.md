# GATEGA HILLS SHOP - Backend API

Laravel API backend for GATEGA HILLS SHOP e-commerce platform.

## Technology Stack
- Laravel 10+
- MySQL 8.0+
- PHP 8.1+

## Setup Instructions

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install PHP dependencies:
   ```bash
   composer install
   ```

3. Configure environment:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` file with your database credentials:
   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=gatega_hills_shop
   DB_USERNAME=root
   DB_PASSWORD=your_password
   ```

5. Generate application key:
   ```bash
   php artisan key:generate
   ```

6. Run migrations:
   ```bash
   php artisan migrate
   ```

7. Seed database (optional):
   ```bash
   php artisan db:seed
   ```

8. Start development server:
   ```bash
   php artisan serve
   ```

The API will be available at `http://localhost:8000`

## API Endpoints

### Public Routes
- `GET /api/categories` - List all categories
- `GET /api/categories/{id}` - Show category details
- `GET /api/products` - List all products (with filters)
- `GET /api/products/{id}` - Show product details
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `POST /api/forgot-password` - Password reset request

### Protected Routes (Require Authentication)
- `GET /api/user` - Get authenticated user
- `POST /api/logout` - Logout user
- `POST /api/orders` - Create order
- `GET /api/orders` - List user's orders
- `GET /api/orders/{id}` - Show order details

### Admin Routes (Require Admin Role)
- `GET /api/admin/users` - List all users
- `PUT /api/admin/users/{id}` - Update user
- `DELETE /api/admin/users/{id}` - Delete user
- `POST /api/admin/categories` - Create category
- `PUT /api/admin/categories/{id}` - Update category
- `DELETE /api/admin/categories/{id}` - Delete category
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/{id}` - Update product
- `DELETE /api/admin/products/{id}` - Delete product
- `GET /api/admin/orders` - List all orders
- `PUT /api/admin/orders/{id}` - Update order status

## Database Schema

### Tables
- `users` - User accounts with role-based access
- `categories` - Product categories
- `products` - Products with category relationships
- `orders` - Customer orders
- `order_items` - Individual items within orders

## Authentication
- Uses Laravel Sanctum for API authentication
- Token-based authentication for SPA
- Role-based middleware for admin routes

## File Structure
```
backend/
├── app/
│   ├── Models/
│   │   ├── User.php
│   │   ├── Category.php
│   │   ├── Product.php
│   │   ├── Order.php
│   │   └── OrderItem.php
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── AuthController.php
│   │   │   ├── CategoryController.php
│   │   │   ├── ProductController.php
│   │   │   ├── OrderController.php
│   │   │   └── Admin/
│   │   └── Middleware/
│   │       └── AdminMiddleware.php
│   └── Providers/
├── database/
│   └── migrations/
├── routes/
│   └── api.php
├── .env.example
├── composer.json
└── README.md
```