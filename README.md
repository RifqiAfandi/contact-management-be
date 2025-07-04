# Contact Coffee - Backend API

A comprehensive backend system for managing coffee shop operations including inventory, products, transactions, and user management. Built with Express.js, Sequelize ORM, and PostgreSQL database support.

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
- [AI Development Assistance](#ai-development-assistance)
- [Contributing](#contributing)

## ✨ Features

### Core Modules

- **Authentication & Authorization** - JWT-based user authentication with role-based access control and secure logout
- **User Management** - Complete CRUD operations for user accounts
- **Product Management** - Coffee shop product catalog with categories, pricing, and image uploads
- **Inventory Management** - Coffee ingredients and supplies tracking with expiration dates and usage monitoring
- **Transaction Management** - Sales transaction processing and history for coffee shop operations
- **Financial Reporting** - Monthly revenue and expense tracking for business analytics

### Key Capabilities

- 🔐 Secure authentication with JWT tokens and session management
- 🚪 Secure logout functionality with backend session clearing
- 📊 Advanced filtering, sorting, and pagination
- 📷 Image upload with ImageKit integration
- 📈 Real-time inventory status calculation for coffee ingredients
- 🔔 Low stock notifications with smart logic for coffee supplies
- 📅 Monthly data analytics and reporting for business insights
- 🛡️ Input validation and SQL injection prevention
- 🎯 Role-based access control (Admin, Cashier, Warehouse)
- ☕ Coffee shop specific inventory and product management

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
   git clone https://github.com/RifqiAfandi/contact-coffee.git
   cd contact-coffee-be
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
DB_NAME=contact_coffee
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
   createdb contact_coffee
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
POST   /api/auth/logout       # User logout (secure session clearing)
GET    /api/auth/users        # Get all users (Admin only)
PUT    /api/auth/users/:id    # Update user
DELETE /api/auth/users/:id    # Delete user
```

### Products

```
GET    /api/products          # Get coffee shop products (paginated)
GET    /api/products/all      # Get all products (no pagination)
POST   /api/products          # Create new product
PUT    /api/products/:id      # Update product
DELETE /api/products/:id      # Delete product
```

### Inventory

```
GET    /api/inventory         # Get coffee ingredients/supplies (paginated)
GET    /api/inventory/all     # Get all inventory (no pagination)
POST   /api/inventory         # Add inventory item
PUT    /api/inventory/:id     # Update inventory item
DELETE /api/inventory/:id     # Delete inventory item
GET    /api/inventory/low-stock # Get low stock notifications
GET    /api/inventory/monthly-expenses # Get monthly expenses
```

### Transactions

```
GET    /api/transactions      # Get coffee shop transactions
POST   /api/transactions      # Create new transaction
GET    /api/transactions/:id  # Get transaction by ID
GET    /api/transactions/monthly-revenue # Get monthly revenue
GET    /api/transactions/check-monthly   # Check monthly data
```

## 📚 Documentation

Postman : https://documenter.getpostman.com/view/38718469/2sB34bMj43

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication with secure logout functionality. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Logout Functionality

The system now includes secure logout functionality:

- **POST /api/auth/logout**: Clears server-side sessions and cookies
- **Client-side**: Frontend automatically clears local storage and redirects
- **Security**: Tokens are properly invalidated on logout

### User Roles

- **Admin**: Full access to all endpoints and coffee shop management
- **Cashier**: Access to products and transactions for point-of-sale operations
- **Warehouse**: Access to inventory management for coffee ingredients and supplies

## 📷 File Upload

The system supports image uploads using ImageKit:

- **Supported formats**: JPG, PNG, GIF
- **Maximum file size**: 5MB
- **Storage**: ImageKit cloud storage
- **Automatic optimization**: Yes

## 🤖 AI Development Assistance

This backend system was developed with significant assistance from **GitHub Copilot**, Microsoft's AI-powered coding assistant. The AI collaboration enhanced development efficiency, code quality, and implementation of best practices throughout the entire backend development process.

### 🚀 How GitHub Copilot Helped

**API Development & Architecture**

- Intelligent generation of RESTful API endpoints and route structures
- Automated controller logic for CRUD operations
- Smart middleware implementations for authentication and validation
- Database model relationships and Sequelize configurations

**Security & Authentication**

- JWT token implementation and secure authentication flows
- Password hashing and validation patterns
- Role-based access control middleware
- Input validation and sanitization logic

**Database Management**

- Sequelize model definitions and associations
- Migration scripts for database schema management
- Complex query optimizations and filtering logic
- Database seeder implementations for testing data

**Business Logic Implementation**

- Inventory status calculation algorithms
- Low stock detection and notification systems
- Transaction processing and financial calculations
- Monthly reporting and analytics functions

**Error Handling & Validation**

- Comprehensive error handling patterns
- Request validation middleware
- API response standardization
- Debugging and logging implementations

### 💡 AI-Enhanced Development Features

**Code Generation & Acceleration**

- Rapid scaffolding of Express.js application structure
- Automated generation of common patterns like pagination and sorting
- Smart completion for database queries and API responses
- Efficient implementation of file upload and image processing

**Quality & Performance**

- Optimized database queries and indexing strategies
- Memory-efficient data processing algorithms
- Scalable architecture patterns and modular code organization
- Professional error handling and logging systems

**Integration & Testing**

- ImageKit integration for file storage and optimization
- API testing patterns and validation strategies
- Environment configuration and deployment preparations
- Documentation generation and API endpoint descriptions

### 🛠️ Technical Implementations Enhanced by AI

- **Authentication System**: Complete JWT-based auth with role management
- **Database Operations**: Efficient Sequelize ORM usage with complex relationships
- **File Management**: ImageKit integration for image uploads and optimization
- **API Security**: CORS configuration, input validation, and SQL injection prevention
- **Business Intelligence**: Advanced filtering, sorting, and pagination systems
- **Data Analytics**: Monthly revenue tracking and inventory status calculations

> **Note**: While GitHub Copilot provided extensive assistance in code generation and architecture design, all implementations were thoroughly reviewed, tested, and customized to meet specific business requirements and security standards.

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

- **JWT Authentication**: Secure token-based authentication with logout functionality
- **Session Management**: Proper session clearing and token invalidation on logout
- **Password Hashing**: bcryptjs for password encryption
- **SQL Injection Prevention**: Parameterized queries with Sequelize
- **CORS**: Cross-origin resource sharing configuration
- **Input Validation**: Request validation and sanitization
- **Role-based Access Control**: Route protection by user roles
- **Cookie Security**: Secure cookie handling and clearing

## 📊 Business Logic

### Inventory Status Calculation

```javascript
// Automatic status calculation for coffee ingredients:
- useDate: "Terpakai" (Used)
- expiredDate < today: "Kadaluarsa" (Expired)
- expiredDate within 7 days: "Akan Kadaluarsa" (Will Expire)
- default: "Tersedia" (Available)
```

### Low Stock Logic

```javascript
// Smart low stock detection for coffee supplies:
- If no duplicates exist: Show all items
- If duplicates exist: Show items with count < 3
```

## 📄 License

This project is licensed under the ISC License - see the package.json file for details.

## 🙏 Acknowledgments

This backend system was developed with the invaluable assistance of **GitHub Copilot**, Microsoft's AI-powered development assistant. The AI collaboration significantly accelerated development time, improved code quality, and enabled the implementation of robust backend architecture and security practices.

**Special Thanks:**

- **GitHub Copilot** for intelligent code generation, API design assistance, and backend development best practices
- **Microsoft** for providing cutting-edge AI development tools that enhance server-side development productivity
- **Node.js Community** for excellent ecosystem, libraries, and comprehensive documentation
- **Sequelize Team** for the powerful ORM that simplifies database operations
- **Express.js Contributors** for the robust and flexible web framework
- **Open Source Community** for the amazing packages and tools that power this backend system

---

**Contact Coffee Backend** - Built with ❤️ using Node.js, Express, modern web technologies, and AI-assisted development.

_Powered by GitHub Copilot - Revolutionizing backend development through AI collaboration_
