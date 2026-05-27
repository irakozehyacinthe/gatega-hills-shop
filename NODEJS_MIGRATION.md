# Gatega Hills Shop - Node.js Migration Guide

This document outlines the complete migration from Laravel PHP backend to Node.js (NestJS) with MongoDB.

## Overview

The project now consists of:
- **Frontend**: React.js (Vite) - `/src`
- **Backend**: NestJS + Express + MongoDB - `/backend-node`

### Key Technologies

- **Frontend**: React 18, React Router, Tailwind CSS, TypeScript
- **Backend**: NestJS, Express, MongoDB (Mongoose), JWT Auth
- **Database**: MongoDB (instead of MySQL/SQLite)
- **Authentication**: JWT Bearer tokens

## Project Structure

```
GATEGA HILLS SHOP/
├── frontend (React app)
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
├── backend-node/ (NestJS)
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── categories/
│   │   │   ├── products/
│   │   │   └── orders/
│   │   ├── common/schemas/
│   │   ├── main.ts
│   │   └── app.module.ts
│   ├── package.json
│   └── .env
└── README files
```

## Backend Setup

### Prerequisites

- Node.js 16+ 
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. Navigate to backend folder:
```bash
cd backend-node
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from template:
```bash
cp .env.example .env
```

4. Update `.env` with your settings:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/gatega_hills
JWT_SECRET=your-secret-key-change-this
FRONTEND_URL=http://localhost:5173
```

### Running Development Server

```bash
npm run start:dev
```

The API will be available at: **http://localhost:3000**

### Building for Production

```bash
npm run build
npm run start:prod
```

## Frontend Setup

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

From the root directory:

```bash
npm install
# or if using yarn
yarn install
```

### Configuration

Create `.env.local` in the root directory:

```env
VITE_API_URL=http://localhost:3000
```

For production, update to your backend URL:
```env
VITE_API_URL=https://api.yourdomain.com
```

### Running Development Server

```bash
npm run dev
```

Frontend will be available at: **http://localhost:5173**

### Building for Production

```bash
npm run build
npm run preview
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/user` - Get current user (requires auth)
- `POST /auth/logout` - Logout user (requires auth)

### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get single product
- `POST /products` - Create product (admin only)
- `PUT /products/:id` - Update product (admin only)
- `DELETE /products/:id` - Delete product (admin only)
- `PATCH /products/:id/stock` - Update product stock (admin only)

### Categories
- `GET /categories` - Get all categories
- `GET /categories/:id` - Get single category
- `POST /categories` - Create category (admin only)
- `PUT /categories/:id` - Update category (admin only)
- `DELETE /categories/:id` - Delete category (admin only)

### Orders
- `POST /orders` - Create order (requires auth)
- `GET /orders` - Get user's orders (requires auth)
- `GET /orders/:id` - Get order details (requires auth)
- `GET /admin/orders` - Get all orders (admin only)
- `PUT /admin/orders/:id/status` - Update order status (admin only)

## Authentication

### Token Storage

Tokens are stored in `localStorage` with key: `authToken`

### Request Headers

Include JWT token in Authorization header:

```
Authorization: Bearer <token>
```

### Token Structure

After login/register, you receive:
```json
{
  "access_token": "eyJhbGc...",
  "user": {
    "id": "...",
    "email": "user@example.com",
    "name": "User Name",
    "role": "customer",
    "createdAt": "2024-05-27T..."
  }
}
```

## Database Schema

### User
```javascript
{
  _id: ObjectId,
  email: String (unique),
  name: String,
  password: String (hashed),
  role: String, // 'customer' or 'admin'
  phone_number: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Category
```javascript
{
  _id: ObjectId,
  name: String (unique),
  description: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Product
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  price: Number,
  stock: Number,
  image: String,
  category_id: ObjectId (ref: Category),
  createdAt: Date,
  updatedAt: Date
}
```

### Order
```javascript
{
  _id: ObjectId,
  user_id: ObjectId (ref: User),
  customer_name: String,
  phone_number: String,
  delivery_address: String,
  total_amount: Number,
  order_status: String, // 'pending', 'processing', 'shipped', 'delivered'
  payment_status: String, // 'pending', 'completed', 'failed'
  payment_method: String,
  message: String,
  items: [{
    product_id: ObjectId,
    quantity: Number,
    price: Number
  }],
  createdAt: Date,
  updatedAt: Date
}
```

## Common Tasks

### Adding a User to Admin Role

In MongoDB shell or using Compass:
```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

### Seeding Initial Data

You can add seed data by calling POST endpoints with an admin token:

```bash
curl -X POST http://localhost:3000/categories \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"name":"Beverages","description":"Drinks"}'
```

### Troubleshooting

#### Connection Issues
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- Verify firewall settings

#### Auth Errors
- Ensure token is in `Authorization: Bearer <token>` format
- Check token expiration (7 days)
- Verify `JWT_SECRET` matches on backend

#### CORS Issues
- Update `FRONTEND_URL` in backend `.env`
- Ensure frontend is using correct `VITE_API_URL`

## Deployment

### Docker (Backend)

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY dist ./dist
CMD ["node", "dist/main.js"]
```

Build and run:
```bash
docker build -t gatega-api .
docker run -e MONGODB_URI=your_db -p 3000:3000 gatega-api
```

### Heroku Deployment

1. Create Heroku app:
```bash
heroku create gatega-api
```

2. Set environment variables:
```bash
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_secret
```

3. Deploy:
```bash
git push heroku main
```

### Frontend (Vercel/Netlify)

1. Connect repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variable: `VITE_API_URL=https://your-api.herokuapp.com`

## Support

For issues or questions:
1. Check the logs: `npm run start:dev`
2. Verify `.env` configuration
3. Check MongoDB connection
4. Review API responses in browser DevTools

---

**Last Updated**: May 27, 2024
