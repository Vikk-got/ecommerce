const express = require('express');
const { getUsers, getUserProfile, deleteUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

router.get('/', authMiddleware, adminMiddleware, getUsers);
router.get('/profile', authMiddleware, getUserProfile);
router.delete('/:id', authMiddleware, adminMiddleware, deleteUser);

module.exports = router;
