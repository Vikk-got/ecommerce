const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');
const fs = require('fs').promises;
const path = require('path');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create new product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, stock } = req.body;

  // Validation
  if (!name || !description || !price || !category || stock === undefined) {
    res.status(400);
    throw new Error('All fields required');
  }

  if (!req.file) {
    res.status(400);
    throw new Error('Image required');
  }

  if (price < 0) {
    res.status(400);
    throw new Error('Price must be positive');
  }

  const validCategories = ['Laptops', 'Phones', 'Headphones', 'Watches', 'Accessories'];
  if (!validCategories.includes(category)) {
    res.status(400);
    throw new Error('Invalid category');
  }

  const product = await Product.create({
    name,
    description,
    price: Number(price),
    category,
    stock: Number(stock),
    imageUrl: req.file.filename,
  });

  res.status(201).json(product);
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, stock } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Update fields if provided
  if (name) product.name = name;
  if (description) product.description = description;
  if (price !== undefined) {
    if (price < 0) {
      res.status(400);
      throw new Error('Price must be positive');
    }
    product.price = Number(price);
  }
  if (category) {
    const validCategories = ['Laptops', 'Phones', 'Headphones', 'Watches', 'Accessories'];
    if (!validCategories.includes(category)) {
      res.status(400);
      throw new Error('Invalid category');
    }
    product.category = category;
  }
  if (stock !== undefined) product.stock = Number(stock);

  // Handle image update
  if (req.file) {
    // Delete old image
    const oldImagePath = path.join(__dirname, '..', 'uploads', product.imageUrl);
    try {
      await fs.unlink(oldImagePath);
    } catch (error) {
      console.log('Error deleting old image:', error.message);
    }

    product.imageUrl = req.file.filename;
  }

  const updatedProduct = await product.save();
  res.json(updatedProduct);
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Delete product image
  const imagePath = path.join(__dirname, '..', 'uploads', product.imageUrl);
  try {
    await fs.unlink(imagePath);
  } catch (error) {
    console.log('Error deleting image:', error.message);
  }

  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Product deleted successfully' });
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
