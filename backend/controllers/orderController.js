const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const { shippingAddress } = req.body;

  // Validate shipping address
  if (
    !shippingAddress ||
    !shippingAddress.fullName ||
    !shippingAddress.address ||
    !shippingAddress.city ||
    !shippingAddress.postalCode ||
    !shippingAddress.country
  ) {
    res.status(400);
    throw new Error('All shipping address fields required');
  }

  // Get user's cart
  const cart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');

  if (!cart || cart.items.length === 0) {
    res.status(400);
    throw new Error('Cart is empty');
  }

  // Prepare order items and calculate total
  const orderItems = [];
  let totalAmount = 0;

  for (const item of cart.items) {
    const product = await Product.findById(item.productId._id);

    if (!product) {
      res.status(404);
      throw new Error(`Product not found: ${item.productId.name}`);
    }

    // Check stock availability
    if (product.stock < item.quantity) {
      res.status(400);
      throw new Error(`Insufficient stock for product: ${product.name}`);
    }

    // Create order item with snapshotted data
    orderItems.push({
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
    });

    totalAmount += product.price * item.quantity;

    // Decrease product stock
    product.stock -= item.quantity;
    await product.save();
  }

  // Create order
  const order = await Order.create({
    userId: req.user._id,
    items: orderItems,
    totalAmount,
    shippingAddress,
  });

  // Clear user's cart
  cart.items = [];
  await cart.save();

  res.status(201).json(order);
});

// @desc    Get orders (user gets own, admin gets all)
// @route   GET /api/orders
// @access  Private
const getOrders = asyncHandler(async (req, res) => {
  let orders;

  if (req.user.role === 'admin') {
    // Admin gets all orders
    orders = await Order.find({})
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
  } else {
    // User gets only their orders
    orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
  }

  res.json(orders);
});

// @desc    Get single order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('userId', 'name email')
    .populate('items.productId');

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  // Check if user owns the order or is admin
  if (order.userId._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Access denied');
  }

  res.json(order);
});

// @desc    Update order status (admin only)
// @route   PUT /api/orders/:id
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const validStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
  if (!status || !validStatuses.includes(status)) {
    res.status(400);
    throw new Error('Invalid status');
  }

  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  order.status = status;
  const updatedOrder = await order.save();

  res.json(updatedOrder);
});

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
};
