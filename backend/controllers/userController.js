const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// @desc    Get all users (admin only)
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password');
  res.json(users);
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Delete user (admin only)
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Prevent admin from deleting themselves
  if (user._id.toString() === req.user._id.toString()) {
    res.status(400);
    throw new Error('Cannot delete yourself');
  }

  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted successfully' });
});

// @desc    Toggle user block status (admin only)
// @route   PUT /api/users/:id/block
// @access  Private/Admin
const toggleUserBlock = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Prevent admin from blocking themselves
  if (user._id.toString() === req.user._id.toString()) {
    res.status(400);
    throw new Error('Cannot block yourself');
  }

  // Prevent blocking other admins
  if (user.role === 'admin') {
    res.status(400);
    throw new Error('Cannot block admin users');
  }

  // Toggle blocked status
  user.isBlocked = !user.isBlocked;
  await user.save();

  res.json({
    message: user.isBlocked ? 'User blocked successfully' : 'User unblocked successfully',
    isBlocked: user.isBlocked,
  });
});

module.exports = {
  getUsers,
  getUserProfile,
  deleteUser,
  toggleUserBlock,
};
