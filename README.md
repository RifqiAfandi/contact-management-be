# Contact Management System - Backend API

A comprehensive backend system for managing contacts, inventory, products, and transactions. Built with Express.js, Sequelize ORM, and PostgreSQL/MySQL database support.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [File Upload](#file-upload)
- [Contributing](#contributing)

## ✨ Features

### Core Modules

- **Authentication & Authorization** - JWT-based user authentication with role-based access control
- **User Management** - Complete CRUD operations for user accounts
- **Product Management** - Product catalog with categories, pricing, and image uploads
- **Inventory Management** - Stock tracking with expiration dates and usage monitoring
- **Transaction Management** - Sales transaction processing and history
- **Financial Reporting** - Monthly revenue and expense tracking

### Key Capabilities

- 🔐 Secure authentication with JWT tokens
- 📊 Advanced filtering, sorting, and pagination
- 📷 Image upload with ImageKit integration
- 📈 Real-time inventory status calculation
- 🔔 Low stock notifications with smart logic
- 📅 Monthly data analytics and reporting
- 🛡️ Input validation and SQL injection prevention
- 🎯 Role-based access control (Admin, Cashier, Warehouse)

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL / MySQL (Sequelize ORM)
- **Authentication:** JWT (JSON Web Tokens)
- **File Storage:** ImageKit
- **Validation:** Express Validator
- **Security:** bcryptjs, CORS
- **Development:** Nodemon, Morgan (logging)

## 📁 Project Structure

```
contact-management-be/
├── bin/
│   └── www                 # Server startup script
├── config/
│   └── database.js         # Database configuration
├── controllers/
│   ├── authController.js   # Authentication & user management
│   ├── productController.js # Product CRUD operations
│   ├── inventoryController.js # Inventory management
│   └── transactionController.js # Transaction processing
├── lib/
│   └── imagekit.js         # ImageKit configuration
├── middlewares/
│   ├── authMiddleware.js   # JWT authentication middleware
│   └── uploader.js         # File upload middleware
├── migrations/             # Database migrations
├── models/                 # Sequelize models
├── routes/                 # API route definitions
├── seeders/               # Database seeders
├── index.js               # Main application file
└── package.json           # Dependencies and scripts
```

## 🚀 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/RifqiAfandi/contact-management.git
   cd contact-management-be
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .envexample .env
   # Edit .env with your configuration
   ```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000

# Database Configuration
DB_NAME=contact_management
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_DIALECT=postgres

# JWT Configuration
JWT_SECRET=your_jwt_secret_key

# ImageKit Configuration
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

## 💾 Database Setup

1. **Create database**

   ```bash
   createdb contact_management
   ```

2. **Run migrations**

   ```bash
   npx sequelize-cli db:migrate
   ```

3. **Seed database (optional)**
   ```bash
   npx sequelize-cli db:seed:all
   ```

## 🏃‍♂️ Running the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will start on `http://localhost:5000`

## 📚 API Endpoints

### Authentication

```
POST   /api/auth/register     # User registration
POST   /api/auth/login        # User login
GET    /api/auth/users        # Get all users (Admin only)
PUT    /api/auth/users/:id    # Update user
DELETE /api/auth/users/:id    # Delete user
```

### Products

```
GET    /api/products          # Get all products (paginated)
GET    /api/products/all      # Get all products (no pagination)
POST   /api/products          # Create new product
PUT    /api/products/:id      # Update product
DELETE /api/products/:id      # Delete product
```

### Inventory

```
GET    /api/inventory         # Get inventory items (paginated)
GET    /api/inventory/all     # Get all inventory (no pagination)
POST   /api/inventory         # Add inventory item
PUT    /api/inventory/:id     # Update inventory item
DELETE /api/inventory/:id     # Delete inventory item
GET    /api/inventory/low-stock # Get low stock notifications
GET    /api/inventory/monthly-expenses # Get monthly expenses
```

### Transactions

```
GET    /api/transactions      # Get all transactions
POST   /api/transactions      # Create new transaction
GET    /api/transactions/:id  # Get transaction by ID
GET    /api/transactions/monthly-revenue # Get monthly revenue
GET    /api/transactions/check-monthly   # Check monthly data
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### User Roles

- **Admin**: Full access to all endpoints
- **Cashier**: Access to products and transactions
- **Warehouse**: Access to inventory management

## 📷 File Upload

The system supports image uploads using ImageKit:

- **Supported formats**: JPG, PNG, GIF
- **Maximum file size**: 5MB
- **Storage**: ImageKit cloud storage
- **Automatic optimization**: Yes

## 🔍 API Features

### Filtering & Search

Most GET endpoints support query parameters for filtering:

```
GET /api/products?productName=coffee&category=beverage&page=1&limit=10
GET /api/inventory?status=available&itemName=sugar&sortField=expiredDate&sortOrder=asc
```

### Pagination

```json
{
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 48,
    "itemsPerPage": 10
  }
}
```

### Sorting

```
?sortField=createdAt&sortOrder=desc
?sortField=itemName&sortOrder=asc
```

## 🛡️ Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for password encryption
- **SQL Injection Prevention**: Parameterized queries with Sequelize
- **CORS**: Cross-origin resource sharing configuration
- **Input Validation**: Request validation and sanitization
- **Role-based Access Control**: Route protection by user roles

## 📊 Business Logic

### Inventory Status Calculation

```javascript
// Automatic status calculation based on:
- useDate: "Terpakai" (Used)
- expiredDate < today: "Kadaluarsa" (Expired)
- expiredDate within 7 days: "Akan Kadaluarsa" (Will Expire)
- default: "Tersedia" (Available)
```

### Low Stock Logic

```javascript
// Smart low stock detection:
- If no duplicates exist: Show all items
- If duplicates exist: Show items with count < 3
```

## 📄 License

This project is licensed under the ISC License - see the package.json file for details.

---

**Contact Management System Backend** - Built with ❤️ using Node.js, Express, and modern web technologies.
