<div align="center">
  <h1>🚀 Tracklify</h1>
  <p><strong>A comprehensive full-stack personal finance management application.</strong></p>

  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
  [![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
  [![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)

  [Live Demo](https://expense-tracker-6ivh.onrender.com)
</div>

<br />

Tracklify is a robust, responsive web application designed to help users track their income and expenses seamlessly. Built with the MERN stack (MongoDB, Express, React, Node.js), it features secure authentication, interactive data visualizations, and an intuitive user interface.

## ✨ Key Features

* **🔐 Secure Authentication:** Robust user registration and login system utilizing bcrypt for password hashing and JSON Web Tokens (JWT) for secure, stateless authentication (stored as `httpOnly` cookies in production).
* **📊 Interactive Dashboard:** Dynamic data visualization using Recharts, providing users with a clear overview of their financial health through donut charts representing income, expenses, and net balance.
* **💸 Transaction Management:** Full CRUD (Create, Read, Update, Delete) capabilities for transactions, ensuring users have complete control over their financial records.
* **🔍 Advanced Filtering & Pagination:** Client-side pagination combined with category and date-range filters allow users to effortlessly navigate through extensive transaction histories.
* **📱 Responsive UI/UX:** A clean, modern interface featuring a gradient layout that adapts beautifully across desktop, tablet, and mobile devices.

## 🛠️ Technology Stack

### Frontend
* **Core:** React, Vite
* **Routing:** React Router DOM
* **State Management:** React Context API
* **Data Fetching:** Axios
* **Visualization:** Recharts

### Backend
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB & Mongoose ORM
* **Security:** JWT, bcrypt, CORS, cookie-parser

## 📂 Project Architecture

```text
Tracklify/
├── backend/                  # Express API server
│   ├── config/               # Database connection setup
│   ├── controller/           # Business logic for API endpoints
│   ├── middleware/           # Custom middlewares (e.g., JWT verification)
│   ├── models/               # Mongoose schemas (User, Transaction)
│   ├── routes/               # API route definitions
│   └── server.js             # Application entry point
└── frontend/                 # React SPA
    ├── src/
    │   ├── api.js            # Axios instance and API call configurations
    │   ├── components/       # Reusable UI components
    │   ├── context/          # Global state management (AuthContext)
    │   ├── pages/            # View components (Dashboard, Login, etc.)
    └── vite.config.js        # Vite bundler configuration
```

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

* Node.js (v16+ recommended)
* MongoDB (Local instance or MongoDB Atlas cluster)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/tracklify.git
   cd tracklify
   ```

2. **Setup Backend:**
   ```bash
   cd backend
   npm install
   ```

3. **Setup Frontend:**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```
The frontend will be available at `http://localhost:5173`, automatically proxying API requests to the backend at `http://localhost:5000`.

## ⚙️ Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

| Variable | Description | Example |
| :--- | :--- | :--- |
| `PORT` | Backend server port | `5000` |
| `NODE_ENV` | Environment (`development` or `production`) | `development` |
| `MONGO_URI_DEV` | MongoDB connection string (Local) | `mongodb://localhost:27017/tracklify` |
| `MONGO_URI_PROD` | MongoDB connection string (Production)| `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for JWT signing | `your-super-secret-key` |
| `FRONTEND_URL` | URL of the frontend application | `http://localhost:5173` |

## 📡 API Reference

### Authentication
* `POST /api/auth/register` - Register a new user
* `POST /api/auth/login` - Authenticate user & get token
* `POST /api/auth/logout` - Clear authentication cookie

### Transactions
* `GET /api/transactions` - Retrieve all transactions (supports pagination/filtering)
* `POST /api/transactions` - Create a new transaction
* `GET /api/transactions/:id` - Retrieve a specific transaction
* `PUT /api/transactions/:id` - Update a transaction
* `DELETE /api/transactions/:id` - Delete a transaction

## 📦 Build & Deploy

### Frontend (Vite)
```bash
cd frontend
npm run build
```

### Backend Deployment (e.g., Render)
- Ensure `JWT_SECRET`, `MONGO_URI_PROD`, `NODE_ENV=production`, and `FRONTEND_URL` are configured in your hosting environment.
- Serve over HTTPS to ensure `secure` httpOnly cookies function correctly.
- Point the web service start command to `node backend/server.js`.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check [issues page](#) to report a bug or request a feature.

## 📝 License

This project is open-source and available under the MIT License.
