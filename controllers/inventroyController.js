const { Inventory } = require('../models');

async function getAllInventory(req, res) {
  try {
    const inventoryItems = await Inventory.findAll({});

    if (inventoryItems.length === 0) {
      return res.status(404).json({
        status: 'Failed', 
        message: 'No inventory items found',
        isSuccess: false,
        data: null 
      });
    }
    res.status(200).json({
      status: 'Success',
      message: 'Inventory items retrieved successfully',
      isSuccess: true,
      data: inventoryItems
    });
  } catch (error) {
    res.status(500).json({ 
        message: error.message,
        isSuccess: false,
        data: null 
    });
  }
}

async function createInventory(req, res) {
  try {
    const { itemName, itemUrl, purchasePrice, expiredDate, entryDate } = req.body;

    const newInventoryItem = await Inventory.create({
      itemName,
      itemUrl,
      purchasePrice,
      expiredDate,
      entryDate
    });

    res.status(201).json({
      status: 'Success',
      message: 'Inventory item created successfully',
      isSuccess: true,
      data: newInventoryItem
    });
  } catch (error) {
    res.status(500).json({ 
        status: 'Failed',
        message: error.message,
        isSuccess: false,
        data: null 
    });
  }
}

module.exports = {
  getAllInventory,
  createInventory
};