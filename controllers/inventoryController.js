const { Inventory } = require('../models');
const imagekit = require('../lib/imagekit');

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
    if(req.file){
      const file = req.file;
      const split = file.originalname.split('.');
      const ext = split[split.length - 1];
      const { itemName, purchasePrice, expiredDate, entryDate } = req.body;

      const uploadImg = await imagekit.upload({
        file: file.buffer,
        fileName: `${split[0]}-${Date.now()}.${ext}`,
      });

      if (!uploadImg) {
        return res.status(500).json({
          status: 'Failed',
          message: 'Image upload failed',
          isSuccess: false,
          data: null
        });
      }
      else if (uploadImg) {
        const newInventoryItem = await Inventory.create({
          itemName,
          purchasePrice,
          expiredDate,
          entryDate,
          imageUrl: uploadImg.url
        });

        res.status(201).json({
          status: 'Success',
          message: 'Inventory item created successfully',
          isSuccess: true,
          data: newInventoryItem
        });
      }
    }
  } catch (error) {
    res.status(500).json({ 
        status: 'Failed',
        message: error.message,
        isSuccess: false,
        data: null 
    });
  }
}

async function updateInventory(req, res) {
  try {
    const { id } = req.params;
    const { itemName, purchasePrice, expiredDate, entryDate } = req.body;

    const inventoryItem = await Inventory.findByPk(id);
    if (!inventoryItem) {
      return res.status(404).json({
        status: 'Failed',
        message: 'Inventory item not found',
        isSuccess: false,
        data: null
      });
    }

    let updateData = {
      itemName,
      purchasePrice,
      expiredDate,
      entryDate
    };

    if (req.file) {
      const file = req.file;
      const split = file.originalname.split('.');
      const ext = split[split.length - 1];

      const uploadImg = await imagekit.upload({
        file: file.buffer,
        fileName: `${split[0]}-${Date.now()}.${ext}`,
      });

      if (!uploadImg) {
        return res.status(500).json({
          status: 'Failed',
          message: 'Image upload failed',
          isSuccess: false,
          data: null
        });
      }

      updateData.imageUrl = uploadImg.url;
    }

    await inventoryItem.update(updateData);

    const updatedItem = await Inventory.findByPk(id);

    res.status(200).json({
      status: 'Success',
      message: 'Inventory item updated successfully',
      isSuccess: true,
      data: updatedItem
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

async function deleteInventory(req, res) {
  try {
    const { id } = req.params;

    const inventoryItem = await Inventory.findByPk(id);
    if (!inventoryItem) {
      return res.status(404).json({
        status: 'Failed',
        message: 'Inventory item not found',
        isSuccess: false,
        data: null
      });
    }

    await inventoryItem.destroy();

    res.status(200).json({
      status: 'Success',
      message: 'Inventory item deleted successfully',
      isSuccess: true,
      data: null
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
  createInventory,
  updateInventory,
  deleteInventory
};