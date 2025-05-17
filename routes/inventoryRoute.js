const express = require('express');
const router = express.Router();
const multer = require('multer');
const inventoryController = require('../controllers/inventoryController');
const { authenticateToken, isAdmin } = require('../middlewares/authMiddleware');
const {uploader} = require('../middlewares/uploader');

router.get('/', authenticateToken, inventoryController.getAllInventory);
router.post('/', authenticateToken, isAdmin, uploader.single('inventoryImg'), inventoryController.createInventory);
router.put('/:id', authenticateToken, isAdmin, uploader.single('inventoryImg'), inventoryController.updateInventory);
router.delete('/:id', authenticateToken, isAdmin, inventoryController.deleteInventory);

module.exports = router;    