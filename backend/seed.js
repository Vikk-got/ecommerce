require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');
const Product = require('./models/Product');
const Cart = require('./models/Cart');
const Order = require('./models/Order');

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Product.deleteMany({});
    await Cart.deleteMany({});
    await Order.deleteMany({});

    // Create admin user
    console.log('Creating admin user...');
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@ecommerce.com',
      password: 'admin123',
      role: 'admin',
    });
    console.log('Admin user created:', admin.email);

    // Create sample products
    console.log('Creating sample products...');

    const products = [
      // Laptops
      {
        name: 'MacBook Pro 16"',
        description: 'Powerful laptop with M3 chip, 16GB RAM, 512GB SSD',
        price: 2499,
        category: 'Laptops',
        stock: 15,
        imageUrl: 'laptop1.jpg',
      },
      {
        name: 'Dell XPS 15',
        description: 'High-performance laptop with Intel i7, 16GB RAM, 1TB SSD',
        price: 1899,
        category: 'Laptops',
        stock: 20,
        imageUrl: 'laptop2.jpg',
      },
      {
        name: 'HP Spectre x360',
        description: 'Convertible laptop with touchscreen, Intel i5, 8GB RAM',
        price: 1299,
        category: 'Laptops',
        stock: 12,
        imageUrl: 'laptop3.jpg',
      },
      {
        name: 'Lenovo ThinkPad X1',
        description: 'Business laptop with Intel i7, 16GB RAM, 512GB SSD',
        price: 1699,
        category: 'Laptops',
        stock: 18,
        imageUrl: 'laptop4.jpg',
      },

      // Phones
      {
        name: 'iPhone 15 Pro',
        description: 'Latest iPhone with A17 Pro chip, 128GB storage, titanium design',
        price: 999,
        category: 'Phones',
        stock: 30,
        imageUrl: 'phone1.jpg',
      },
      {
        name: 'Samsung Galaxy S24',
        description: 'Flagship Android phone with Snapdragon 8 Gen 3, 256GB',
        price: 899,
        category: 'Phones',
        stock: 25,
        imageUrl: 'phone2.jpg',
      },
      {
        name: 'Google Pixel 8',
        description: 'Pure Android experience with Google Tensor G3, 128GB',
        price: 699,
        category: 'Phones',
        stock: 20,
        imageUrl: 'phone3.jpg',
      },
      {
        name: 'OnePlus 12',
        description: 'Fast charging phone with Snapdragon 8 Gen 3, 256GB',
        price: 799,
        category: 'Phones',
        stock: 15,
        imageUrl: 'phone4.jpg',
      },

      // Headphones
      {
        name: 'AirPods Pro 2',
        description: 'Wireless earbuds with active noise cancellation',
        price: 249,
        category: 'Headphones',
        stock: 50,
        imageUrl: 'headphones1.jpg',
      },
      {
        name: 'Sony WH-1000XM5',
        description: 'Premium over-ear headphones with industry-leading noise cancellation',
        price: 399,
        category: 'Headphones',
        stock: 30,
        imageUrl: 'headphones2.jpg',
      },
      {
        name: 'Bose QuietComfort Ultra',
        description: 'Comfortable headphones with spatial audio and ANC',
        price: 429,
        category: 'Headphones',
        stock: 25,
        imageUrl: 'headphones3.jpg',
      },
      {
        name: 'Beats Studio Pro',
        description: 'Wireless headphones with personalized spatial audio',
        price: 349,
        category: 'Headphones',
        stock: 35,
        imageUrl: 'headphones4.jpg',
      },

      // Watches
      {
        name: 'Apple Watch Series 9',
        description: 'Smartwatch with fitness tracking, ECG, always-on display',
        price: 429,
        category: 'Watches',
        stock: 40,
        imageUrl: 'watch1.jpg',
      },
      {
        name: 'Samsung Galaxy Watch 6',
        description: 'Android smartwatch with health tracking and LTE',
        price: 349,
        category: 'Watches',
        stock: 30,
        imageUrl: 'watch2.jpg',
      },
      {
        name: 'Garmin Fenix 7',
        description: 'Rugged GPS watch for outdoor activities and fitness',
        price: 699,
        category: 'Watches',
        stock: 15,
        imageUrl: 'watch3.jpg',
      },
      {
        name: 'Fitbit Sense 2',
        description: 'Health-focused smartwatch with stress management tools',
        price: 299,
        category: 'Watches',
        stock: 25,
        imageUrl: 'watch4.jpg',
      },

      // Accessories
      {
        name: 'Magic Keyboard',
        description: 'Wireless keyboard for Mac and iPad',
        price: 99,
        category: 'Accessories',
        stock: 60,
        imageUrl: 'accessory1.jpg',
      },
      {
        name: 'Logitech MX Master 3S',
        description: 'Ergonomic wireless mouse with precision tracking',
        price: 99,
        category: 'Accessories',
        stock: 45,
        imageUrl: 'accessory2.jpg',
      },
      {
        name: 'Anker PowerBank 20000mAh',
        description: 'High-capacity portable charger with fast charging',
        price: 49,
        category: 'Accessories',
        stock: 100,
        imageUrl: 'accessory3.jpg',
      },
      {
        name: 'USB-C Hub 7-in-1',
        description: 'Multi-port adapter with HDMI, USB 3.0, SD card reader',
        price: 39,
        category: 'Accessories',
        stock: 80,
        imageUrl: 'accessory4.jpg',
      },
    ];

    const createdProducts = await Product.insertMany(products);
    console.log(`${createdProducts.length} products created`);

    console.log('\nSeed data successfully inserted!');
    console.log('\nAdmin Login Credentials:');
    console.log('Email: admin@ecommerce.com');
    console.log('Password: admin123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
