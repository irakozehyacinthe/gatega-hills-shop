@echo off
REM GATEGA HILLS SHOP - Setup Script for Windows
REM Sets up both backend and frontend for development

setlocal enabledelayedexpansion

echo.
echo 🚀 GATEGA HILLS SHOP - Setup Script
echo ====================================
echo.

REM Check Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js not found. Please install Node.js 16+
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do (
    echo ✅ Node.js %%i found
)

echo.

REM Setup Backend
echo 📦 Setting up NestJS Backend...
cd backend-node

if not exist ".env" (
    echo 📝 Creating .env from template...
    copy .env.example .env
    echo ⚠️  Please update backend-node\.env with your MongoDB URI
)

if not exist "node_modules" (
    echo 📥 Installing backend dependencies...
    call npm install --quiet
)

echo ✅ Backend setup complete
echo.

REM Setup Frontend
cd ..
echo 📦 Setting up React Frontend...

if not exist ".env.local" (
    echo 📝 Creating .env.local...
    (
        echo VITE_API_URL=http://localhost:3000
    ) > .env.local
    echo ✅ Frontend environment configured
)

if not exist "node_modules" (
    echo 📥 Installing frontend dependencies...
    call npm install --quiet
)

echo ✅ Frontend setup complete
echo.

echo 🎉 Setup Complete!
echo.
echo 📝 Next steps:
echo 1. Update backend-node\.env with your MongoDB URI
echo 2. Start backend:  cd backend-node ^&^& npm run start:dev
echo 3. Start frontend (in another terminal): npm run dev
echo.
echo 🌐 URLs:
echo    Backend:  http://localhost:3000
echo    Frontend: http://localhost:5173
echo.

pause
