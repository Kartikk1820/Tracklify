## 💰 Expense Tracker

A Personal Finance Tracker web application built with React, Express, and MongoDB. Track income/expenses, filter by category/date, visualize totals with charts, and manage your data securely.

### 🌐 Live Demo

- Deployed on Render: [expense-tracker-6ivh.onrender.com](https://expense-tracker-6ivh.onrender.com)

## ✨ Features

- **Authentication**
  - Register/Login with hashed passwords (bcrypt)
  - JWT auth; in production the token is stored as an httpOnly cookie
  - Protected routes on the frontend using `ProtectedRoute`
- **Transactions (CRUD)**
  - Add, edit, delete transactions (title, amount, date, category)
  - User-scoped data on the backend (`req.user`)
- **Filters & Pagination**
  - Category dropdown and date range filters in the list
  - Client‑side pagination
- **Charts (Recharts)**
  - Donut chart showing Income, Expense, and Balance
  - Monthly totals data computed on the dashboard (kept for future extensions)
- **UI/UX**
  - Clean layout with a gradient header
  - Responsive tables and forms

## 🛠️ Tech Stack

- **Frontend:** React, React Router, Axios, Vite, Recharts
- **Backend:** Node.js, Express.js, Mongoose, JWT, cookie-parser, CORS
- **Database:** MongoDB

## 📂 Project Structure

```
Finance Tracker/
  backend/
    config/db.js
    middleware/auth.js
    models/{Transaction.js, User.js}
    routes/{auth.js, transactions.js}
    server.js
  frontend/
    src/
      components/{Navbar.jsx, ProtectedRoute.jsx, TransactionList.jsx}
      context/AuthContext.jsx
      pages/{Login.jsx, Register.jsx, Dashboard.jsx, AddEdit.jsx}
      api.js
    vite.config.js
```

## ⚙️ Environment Variables

Create `backend/.env` with:

```
JWT_SECRET=your-super-secret-jwt-key
MONGO_URI_DEV=mongodb://localhost:27017/finance-tracker
MONGO_URI_PROD=your_production_mongo_url
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

Notes:

- In production, set `NODE_ENV=production` and `FRONTEND_URL` to your deployed frontend.
- In production the server sets a `token` httpOnly cookie; in development the frontend uses the bearer token.

## 🚀 Local Development

Terminal 1 — Backend:

```
cd backend
npm i
npm run dev
```

Terminal 2 — Frontend:

```
cd frontend
npm i
npm run dev
```

- Frontend runs at `http://localhost:5173`
- Backend runs at `http://localhost:5000`
- Vite proxy forwards `/api` to the backend. See `frontend/vite.config.js`.

## 🔐 Auth Flow

- Login/Register (`POST /api/auth/login`, `POST /api/auth/register`) returns `{ token, user }`.
- Frontend stores token in `localStorage` in development; in production backend sets an httpOnly cookie.
- Logout (`POST /api/auth/logout`) clears cookie in production; frontend always clears local state.

## 📡 API Routes

Base URL: `/api`

- `POST /auth/register` – create account
- `POST /auth/login` – login
- `POST /auth/logout` – logout (clears cookie in prod)
- `GET /transactions` – list transactions for logged‑in user
- `GET /transactions/:id` – get one
- `POST /transactions` – create
- `PUT /transactions/:id` – update
- `DELETE /transactions/:id` – delete

## 🧭 Frontend Notes

- `src/context/AuthContext.jsx` restores session on refresh and exposes `login`, `logout`, `user`, and `loading`.
- `src/components/ProtectedRoute.jsx` waits for auth `loading` to finish before routing.
- `src/components/Navbar.jsx` includes a Logout button that calls the backend and clears local state.
- `src/pages/TransactionList.jsx` implements category/date filters and client-side pagination.
- `src/pages/Dashboard.jsx` renders a donut chart (Recharts) for Income/Expense/Balance.

## 📦 Build & Deploy

Frontend (Vite):

```
cd frontend
npm run build
```

Backend:

- Ensure `JWT_SECRET`, `MONGO_URI_PROD`, `NODE_ENV=production`, and `FRONTEND_URL` are set.
- Serve over HTTPS so `secure` cookies work.

Render deployment:

- Set environment variables in the service settings
- Point the web service to `backend/server.js`
- Optionally serve the built frontend separately or via static hosting

## 🧪 Quick Test

1. Register a new user
2. Add a few transactions (positive amounts = income, negative = expense)
3. Use filters and pagination on the list
4. See the donut chart update on the dashboard
5. Logout and login again

---

Issues or suggestions? Feel free to open an issue or PR.
