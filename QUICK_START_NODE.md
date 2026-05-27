# Quick Start - React + NestJS Backend

## 🚀 Quick Setup (5 minutes)

### 1. Backend Setup

```bash
cd backend-node
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm run start:dev
```

Backend runs on: **http://localhost:3000**

### 2. Frontend Setup

```bash
# From root directory
npm install
npm run dev
```

Frontend runs on: **http://localhost:5173**

### 3. Create Admin User (First Time)

1. Register a user via http://localhost:5173/register
2. In MongoDB:
   ```javascript
   db.users.updateOne(
     { email: "your@email.com" },
     { $set: { role: "admin" } }
   )
   ```

## 📝 Environment Variables

### Backend (.env)
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/gatega_hills
JWT_SECRET=change-this-secret
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:3000
```

## 🔑 Default Test Accounts

After seeding, use:
- Admin: `admin@example.com` / `password123`
- Customer: `user@example.com` / `password123`

## 🛠️ Common Commands

### Backend
```bash
npm run start:dev      # Development with watch
npm run build          # Build for production
npm run start:prod     # Run production build
npm run lint           # Run linter
```

### Frontend
```bash
npm run dev            # Start dev server
npm run build          # Build for production
npm run preview        # Preview production build
```

## 📚 Key Changes from Laravel

| Feature | Laravel | NestJS |
|---------|---------|--------|
| Database | MySQL | MongoDB |
| Auth | Sanctum | JWT |
| API Base | `/api/*` | `/` (root) |
| Token Key | `authToken` | `authToken` |
| Port | 8000 | 3000 |

## ✅ Checklist

- [ ] MongoDB running locally or provide Atlas URI
- [ ] Dependencies installed (`npm install`)
- [ ] Backend `.env` configured
- [ ] Frontend `.env.local` configured
- [ ] Backend started (`npm run start:dev`)
- [ ] Frontend started (`npm run dev`)
- [ ] Can register/login at http://localhost:5173
- [ ] Admin user created in database

## 🐛 Troubleshooting

**Backend won't start:**
- Check MongoDB connection: `mongosh`
- Verify `.env` is set correctly
- Kill process on port 3000: `lsof -i :3000` then `kill -9 <PID>`

**Frontend can't connect to backend:**
- Backend must be running on localhost:3000
- Check `VITE_API_URL` in `.env.local`
- Check browser console for CORS errors

**Can't login:**
- Ensure user exists in MongoDB
- Check JWT_SECRET is same on backend
- Check token is stored in localStorage

## 📖 Full Documentation

See [NODEJS_MIGRATION.md](NODEJS_MIGRATION.md) for complete documentation.
