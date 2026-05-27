# API Reference - GATEGA HILLS Backend

Base URL: `http://localhost:3000`

All authenticated endpoints require:
```
Authorization: Bearer <token>
```

---

## 🔐 Authentication Endpoints

### Register New Account
```
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone_number": "+250 7XX XXX XXX"  // optional
}

Response 201:
{
  "access_token": "eyJhbGc...",
  "user": {
    "id": "507f...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer",
    "phone_number": "+250 7XX XXX XXX",
    "createdAt": "2024-05-27T...",
    "updatedAt": "2024-05-27T..."
  }
}
```

### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response 200:
{
  "access_token": "eyJhbGc...",
  "user": { ... }
}
```

### Get Current User
```
GET /auth/user
Authorization: Bearer <token>

Response 200:
{
  "id": "507f...",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "customer",
  "phone_number": "+250...",
  "createdAt": "2024-05-27T...",
  "updatedAt": "2024-05-27T..."
}
```

### Logout
```
POST /auth/logout
Authorization: Bearer <token>

Response 200:
{
  "message": "Logged out successfully"
}
```

---

## 📦 Product Endpoints

### Get All Products
```
GET /products

Query Parameters (optional):
  ?categoryId=507f...

Response 200:
[
  {
    "id": "507f...",
    "name": "Product Name",
    "description": "...",
    "price": 5000,
    "stock": 50,
    "image": "https://...",
    "category_id": "507f...",
    "createdAt": "2024-05-27T...",
    "updatedAt": "2024-05-27T..."
  },
  ...
]
```

### Get Single Product
```
GET /products/:id

Response 200:
{
  "id": "507f...",
  "name": "Product Name",
  "description": "...",
  "price": 5000,
  "stock": 50,
  "image": "https://...",
  "category_id": "507f...",
  "createdAt": "...",
  "updatedAt": "..."
}
```

### Create Product (Admin Only)
```
POST /products
Authorization: Bearer <token> (admin required)
Content-Type: application/json

{
  "name": "New Product",
  "description": "Description",
  "price": 5000,
  "stock": 50,
  "image": "https://...",
  "category_id": "507f..."
}

Response 201: [product object]
```

### Update Product (Admin Only)
```
PUT /products/:id
Authorization: Bearer <token> (admin required)
Content-Type: application/json

{
  "name": "Updated Name",
  "price": 6000,
  "stock": 40
}

Response 200: [updated product]
```

### Update Stock (Admin Only)
```
PATCH /products/:id/stock
Authorization: Bearer <token> (admin required)
Content-Type: application/json

{
  "quantity": 10  // positive = add, negative = subtract
}

Response 200: [product with updated stock]
```

### Delete Product (Admin Only)
```
DELETE /products/:id
Authorization: Bearer <token> (admin required)

Response 200:
{
  "message": "Product deleted successfully"
}
```

---

## 🏷️ Category Endpoints

### Get All Categories
```
GET /categories

Response 200:
[
  {
    "id": "507f...",
    "name": "Beverages",
    "description": "All drinks",
    "createdAt": "...",
    "updatedAt": "..."
  },
  ...
]
```

### Get Single Category
```
GET /categories/:id

Response 200: [category object]
```

### Create Category (Admin Only)
```
POST /categories
Authorization: Bearer <token> (admin required)
Content-Type: application/json

{
  "name": "New Category",
  "description": "Description"
}

Response 201: [category object]
```

### Update Category (Admin Only)
```
PUT /categories/:id
Authorization: Bearer <token> (admin required)
Content-Type: application/json

{
  "name": "Updated Name",
  "description": "New description"
}

Response 200: [updated category]
```

### Delete Category (Admin Only)
```
DELETE /categories/:id
Authorization: Bearer <token> (admin required)

Response 200:
{
  "message": "Category deleted successfully"
}
```

---

## 🛒 Order Endpoints

### Create Order (Customer)
```
POST /orders
Authorization: Bearer <token> (customer requirement)
Content-Type: application/json

{
  "customer_name": "John Doe",
  "phone_number": "+250 7XX XXX XXX",
  "delivery_address": "123 Main St, Kigali",
  "message": "Please leave with security",
  "payment_method": "cash",
  "total_amount": 25000,
  "items": [
    {
      "product_id": "507f...",
      "quantity": 2,
      "price": 5000
    }
  ]
}

Response 201:
{
  "id": "507f...",
  "user_id": "507f...",
  "customer_name": "John Doe",
  "phone_number": "+250...",
  "delivery_address": "123 Main St",
  "total_amount": 25000,
  "order_status": "pending",
  "payment_status": "pending",
  "payment_method": "cash",
  "message": "Please leave with security",
  "items": [ ... ],
  "createdAt": "...",
  "updatedAt": "..."
}
```

### Get My Orders (Customer)
```
GET /orders
Authorization: Bearer <token>

Response 200:
[
  [order objects...]
]
```

### Get Single Order (Customer)
```
GET /orders/:id
Authorization: Bearer <token>

Response 200: [order object]
```

### Get All Orders (Admin Only)
```
GET /admin/orders
Authorization: Bearer <token> (admin required)

Query Parameters (optional):
  ?order_status=pending
  ?search=customer_name_or_phone

Response 200:
[
  [order objects...]
]
```

### Update Order Status (Admin Only)
```
PUT /admin/orders/:id/status
Authorization: Bearer <token> (admin required)
Content-Type: application/json

{
  "order_status": "processing"  // pending, processing, shipped, delivered, cancelled
}

Response 200: [updated order]
```

---

## Error Responses

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": "Invalid input data"
}
```

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

### 403 Forbidden
```json
{
  "statusCode": 403,
  "message": "Access denied. Admin role required."
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Product not found"
}
```

### 409 Conflict
```json
{
  "statusCode": 409,
  "message": "User already exists"
}
```

---

## Test with cURL

### Register
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John",
    "email": "john@example.com",
    "password": "test123"
  }'
```

### Get Products
```bash
curl http://localhost:3000/products
```

### Create Order (Requires Auth)
```bash
curl -X POST http://localhost:3000/orders \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "customer_name": "John",
    "phone_number": "+250...",
    "delivery_address": "...",
    "total_amount": 10000,
    "payment_method": "cash",
    "items": [{"product_id": "...", "quantity": 1, "price": 5000}]
  }'
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request succeeded |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Need login |
| 403 | Forbidden - Admin required |
| 404 | Not Found - Resource not found |
| 500 | Server Error |

---

## Rate Limiting

None configured currently, but can be added.

## API Version

Current: **v1** (base path: `/`)

---

**Last Updated**: May 27, 2024
