const express = require('express');
const { getUsers, getUserProfile, deleteUser, toggleUserBlock } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

router.get('/', authMiddleware, adminMiddleware, getUsers);
router.get('/profile', authMiddleware, getUserProfile);
router.delete('/:id', authMiddleware, adminMiddleware, deleteUser);
router.put('/:id/block', authMiddleware, adminMiddleware, toggleUserBlock);

module.exports = router;
