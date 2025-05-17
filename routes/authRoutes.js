const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const { authenticateToken, isAdmin } = require('../middlewares/authMiddleware');

router.post('/users', authenticateToken, isAdmin, AuthController.createUser);
router.post('/login', AuthController.login);
router.get('/users', authenticateToken, isAdmin, AuthController.getAllUsers);
router.get('/users/:id', authenticateToken, isAdmin, AuthController.getUserById);

module.exports = router;