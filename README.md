# Tech Store - Full-Stack eCommerce Platform

A modern, full-stack eCommerce platform for selling tech products. Built with React.js (Vite) for the frontend, Express.js + Node.js for the backend, and MongoDB for the database.

## Features

### Customer Features
- Browse products by category (Laptops, Phones, Headphones, Watches, Accessories)
- Search products by name and description
- View detailed product information
- Add products to cart
- Adjust cart quantities
- Secure checkout with shipping address
- User authentication (JWT-based)
- User registration and login

### Admin Features
- Manage products (Create, Read, Update, Delete)
- Upload product images
- Manage orders and update order status
- View all users
- Admin dashboard with tabs for Products, Orders, and Users

### Technical Features
- JWT authentication with role-based access control (user/admin)
- RESTful API architecture
- Responsive design with vanilla CSS
- Bold & Strong UI design with thick borders and high contrast
- File upload handling for product images
- Cart persistence across sessions
- Order history with product snapshots

## Tech Stack

### Frontend
- **React.js 18** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Vanilla CSS** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

## Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## Installation

### 1. Clone the repository
```bash
cd ecom
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file (copy from .env.example and update values)
cp .env.example .env

# Update .env with your MongoDB URI and JWT secret
# Example .env:
# PORT=5000
# NODE_ENV=development
# MONGO_URI=mongodb://localhost:27017/ecommerce
# JWT_SECRET=your_very_secure_random_secret_key_here
# CLIENT_URL=http://localhost:5173
```

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# The default VITE_API_URL=http://localhost:5000 should work for local development
```

### 4. Seed Database (Optional but Recommended)

This will populate your database with sample products and an admin user.

```bash
cd backend
npm run seed
```

**Admin Credentials (after seeding):**
- Email: `admin@ecommerce.com`
- Password: `admin123`

## Running the Application

### Start Backend Server

```bash
cd backend
npm run dev
```

Backend will run on `http://localhost:5000`

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

Frontend will run on `http://localhost:5173`

## Project Structure

```
ecom/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   ├── productController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── adminMiddleware.js
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── Cart.js
│   │   ├── Order.js
│   │   ├── Product.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── productRoutes.js
│   │   └── userRoutes.js
│   ├── uploads/                  # Product images
│   ├── utils/
│   │   └── generateToken.js
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   ├── seed.js
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AdminRoute.jsx
│   │   │   ├── CartItem.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── PrivateRoute.jsx
│   │   │   └── ProductCard.jsx
│   │   ├── pages/
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── OrderSuccess.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   └── Register.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── styles/
│   │   │   ├── App.css
│   │   │   ├── Auth.css
│   │   │   ├── Cart.css
│   │   │   ├── CartItem.css
│   │   │   ├── Checkout.css
│   │   │   ├── Dashboard.css
│   │   │   ├── Home.css
│   │   │   ├── Navbar.css
│   │   │   ├── OrderSuccess.css
│   │   │   ├── ProductCard.css
│   │   │   └── ProductDetails.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products (public)
- `GET /api/products/:id` - Get single product (public)
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Cart
- `GET /api/cart` - Get user's cart (authenticated)
- `POST /api/cart` - Add item to cart (authenticated)
- `PUT /api/cart` - Update cart item quantity (authenticated)
- `DELETE /api/cart/:productId` - Remove item from cart (authenticated)

### Orders
- `POST /api/orders` - Create order (authenticated)
- `GET /api/orders` - Get orders (user gets own, admin gets all)
- `GET /api/orders/:id` - Get single order (authenticated)
- `PUT /api/orders/:id` - Update order status (admin only)

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/profile` - Get user profile (authenticated)
- `DELETE /api/users/:id` - Delete user (admin only)

## Usage Guide

### For Customers

1. **Browse Products**
   - Visit the home page to see all products
   - Use category filters to narrow down products
   - Use the search bar to find specific products

2. **Register/Login**
   - Click "Register" to create a new account
   - Or "Login" if you already have an account

3. **Add to Cart**
   - Click on a product to view details
   - Select quantity and click "Add to Cart"

4. **Checkout**
   - Go to Cart page
   - Review items and adjust quantities if needed
   - Click "Proceed to Checkout"
   - Fill in shipping address
   - Click "Place Order"

### For Admins

1. **Login as Admin**
   - Use admin credentials to login
   - You'll be redirected to the Dashboard

2. **Manage Products**
   - Click "Add Product" to create new products
   - Upload product images (max 5MB)
   - Edit or delete existing products

3. **Manage Orders**
   - View all customer orders
   - Update order status (Pending, Processing, Shipped, Delivered, Cancelled)
   - View order details

4. **Manage Users**
   - View all registered users
   - Delete users if needed

## Design System

The application follows a **Bold & Strong** design philosophy:

- **Colors:**
  - Primary: #333333 (dark gray)
  - Background: #ffffff (white) and #f5f5f5 (light gray)
  - Borders: #999999 and #e0e0e0 (gray shades)
  - Error: #d32f2f (red)
  - Success: #388e3c (green)

- **Typography:**
  - Font: Arial, Helvetica, sans-serif
  - Bold headings with uppercase text
  - Strong borders (2px) on all major elements

- **Responsive:**
  - Mobile-first approach
  - Breakpoints at 768px for mobile/tablet
  - Grid layouts that stack on mobile

## Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_very_secure_random_secret_key_here
CLIENT_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
```

## Scripts

### Backend
```bash
npm start      # Start server (production)
npm run dev    # Start server with nodemon (development)
npm run seed   # Seed database with sample data
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Production Deployment Notes

For production deployment, consider:

1. **Security:**
   - Use a strong JWT_SECRET
   - Enable HTTPS
   - Implement rate limiting
   - Add input validation
   - Use environment-specific configs

2. **Database:**
   - Use MongoDB Atlas for cloud hosting
   - Enable authentication
   - Regular backups

3. **File Storage:**
   - Use cloud storage (AWS S3, Cloudinary) instead of local uploads
   - Implement image optimization

4. **Performance:**
   - Add caching (Redis)
   - Implement pagination
   - Optimize images
   - Minify frontend build

5. **Monitoring:**
   - Set up error logging
   - Implement health checks
   - Monitor API performance

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please create an issue in the repository.
#   v a t s a l _ s t o r e _ s i t e  
 #   e c o m m e r c e - w e b s i t e  
 #   e c o m m e r c e  
 