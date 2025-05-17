const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const { authenticateToken, isAdmin } = require('../middlewares/authMiddleware');

router.get('/', inventoryController.getAllProducts);
router.post('/', authenticateToken, isAdmin, inventoryController.createProduct);

module.exports = router;