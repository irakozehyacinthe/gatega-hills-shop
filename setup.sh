#!/bin/bash

# GATEGA HILLS SHOP - Setup Script
# Sets up both backend and frontend for development

set -e

echo "🚀 GATEGA HILLS SHOP - Setup Script"
echo "===================================="
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 16+"
    exit 1
fi

echo "✅ Node.js $(node -v) found"
echo ""

# Setup Backend
echo "📦 Setting up NestJS Backend..."
cd backend-node

if [ ! -f ".env" ]; then
    echo "📝 Creating .env from template..."
    cp .env.example .env
    echo "⚠️  Please update backend-node/.env with your MongoDB URI"
fi

if [ ! -d "node_modules" ]; then
    echo "📥 Installing backend dependencies..."
    npm install --quiet
fi

echo "✅ Backend setup complete"
echo ""

# Setup Frontend
cd ..
echo "📦 Setting up React Frontend..."

if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local..."
    cat > .env.local << EOF
VITE_API_URL=http://localhost:3000
EOF
    echo "✅ Frontend environment configured"
fi

if [ ! -d "node_modules" ]; then
    echo "📥 Installing frontend dependencies..."
    npm install --quiet
fi

echo "✅ Frontend setup complete"
echo ""

echo "🎉 Setup Complete!"
echo ""
echo "📝 Next steps:"
echo "1. Update backend-node/.env with your MongoDB URI"
echo "2. Start backend:  cd backend-node && npm run start:dev"
echo "3. Start frontend (in another terminal): npm run dev"
echo ""
echo "🌐 URLs:"
echo "   Backend:  http://localhost:3000"
echo "   Frontend: http://localhost:5173"
echo ""
