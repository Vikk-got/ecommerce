const asyncHandler = require('express-async-handler');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
const getCart = asyncHandler(async (req, res) => {
  let cart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');

  if (!cart) {
    // Return empty cart if doesn't exist
    return res.json({
      userId: req.user._id,
      items: [],
    });
  }

  res.json(cart);
});

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    res.status(400);
    throw new Error('Product ID and quantity required');
  }

  if (quantity < 1) {
    res.status(400);
    throw new Error('Invalid quantity');
  }

  // Check if product exists
  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Check stock availability
  if (product.stock < quantity) {
    res.status(400);
    throw new Error('Insufficient stock');
  }

  // Find or create cart
  let cart = await Cart.findOne({ userId: req.user._id });

  if (!cart) {
    cart = await Cart.create({
      userId: req.user._id,
      items: [{ productId, quantity }],
    });
  } else {
    // Check if product already in cart
    const existingItemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

    if (existingItemIndex > -1) {
      // Update quantity
      cart.items[existingItemIndex].quantity += quantity;

      // Check stock for updated quantity
      if (product.stock < cart.items[existingItemIndex].quantity) {
        res.status(400);
        throw new Error('Insufficient stock');
      }
    } else {
      // Add new item
      cart.items.push({ productId, quantity });
    }

    await cart.save();
  }

  // Populate and return cart
  cart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');
  res.json(cart);
});

// @desc    Update cart item quantity
// @route   PUT /api/cart
// @access  Private
const updateCartItem = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    res.status(400);
    throw new Error('Product ID and quantity required');
  }

  if (quantity < 1) {
    res.status(400);
    throw new Error('Invalid quantity');
  }

  const cart = await Cart.findOne({ userId: req.user._id });

  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

  if (itemIndex === -1) {
    res.status(404);
    throw new Error('Product not found in cart');
  }

  // Check stock availability
  const product = await Product.findById(productId);
  if (product.stock < quantity) {
    res.status(400);
    throw new Error('Insufficient stock');
  }

  cart.items[itemIndex].quantity = quantity;
  await cart.save();

  // Populate and return cart
  const updatedCart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');
  res.json(updatedCart);
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
const removeFromCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id });

  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === req.params.productId
  );

  if (itemIndex === -1) {
    res.status(404);
    throw new Error('Product not found in cart');
  }

  cart.items.splice(itemIndex, 1);
  await cart.save();

  // Populate and return cart
  const updatedCart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');
  res.json(updatedCart);
});

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
};