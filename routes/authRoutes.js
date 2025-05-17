const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const { authenticateToken, isAdmin } = require('../middlewares/authMiddleware');

router.post('/users', authenticateToken, isAdmin, AuthController.createUser);
router.post('/login', AuthController.login);

module.exports = router;