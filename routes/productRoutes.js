const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticateToken, isAdmin } = require('../middlewares/authMiddleware');

router.get('/', productController.getAllProducts);
router.post('/', authenticateToken, isAdmin, productController.createProduct);

module.exports = router;