# Gatega Hills Shop - NestJS Backend

This folder contains a NestJS backend replacement for the original Laravel backend. It uses MongoDB with Mongoose and provides equivalent API endpoints for the React frontend.

Getting started

1. Copy `.env.example` to `.env` and update values if needed.

2. Install dependencies:

```bash
cd backend-node
npm install
```

3. Start the server in development mode:

```bash
npm run start:dev
```

4. The API will be available at `http://localhost:3000` by default.

API endpoints mirror the original Laravel routes. Example:

- `POST /auth/register`
- `POST /auth/login`
- `GET /products`
- `POST /orders` (authenticated)

If you'd like, I can update the React frontend `apiClient` to point to this backend and adjust any auth logic next steps.
