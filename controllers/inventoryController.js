const { Inventory } = require("../models");
const imagekit = require("../lib/imagekit");

async function getAllInventory(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows: inventoryItems } = await Inventory.findAndCountAll({
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"]],
    });

    const totalPages = Math.ceil(count / limit);

    if (inventoryItems.length === 0) {
      return res.status(404).json({
        status: "Failed",
        message: "No inventory items found",
        isSuccess: false,
        data: null,
        pagination: {
          currentPage: page,
          totalPages: totalPages,
          totalItems: count,
          itemsPerPage: limit,
        },
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Inventory items retrieved successfully",
      isSuccess: true,
      data: inventoryItems,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalItems: count,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
}

async function createInventory(req, res) {
  try {
    console.log("📝 Request body:", req.body);
    console.log("📁 Request file:", req.file);

    const { itemName, purchasePrice, expiredDate, entryDate, userId } =
      req.body;

    if (!itemName || !purchasePrice || !entryDate || !userId) {
      return res.status(400).json({
        status: "Failed",
        message:
          "Missing required fields: itemName, purchasePrice, entryDate, userId",
        isSuccess: false,
        data: null,
      });
    }

    let imageUrl = null;

    if (req.file) {
      const file = req.file;
      const split = file.originalname.split(".");
      const ext = split[split.length - 1];

      try {
        const uploadImg = await imagekit.upload({
          file: file.buffer,
          fileName: `${split[0]}-${Date.now()}.${ext}`,
        });

        if (!uploadImg || !uploadImg.url) {
          return res.status(500).json({
            status: "Failed",
            message: "Image upload failed",
            isSuccess: false,
            data: null,
          });
        }

        imageUrl = uploadImg.url;
        console.log("✅ Image uploaded successfully:", imageUrl);
      } catch (uploadError) {
        console.error("❌ ImageKit upload error:", uploadError);
        return res.status(500).json({
          status: "Failed",
          message: "Image upload failed: " + uploadError.message,
          isSuccess: false,
          data: null,
        });
      }
    }

    const newInventoryItem = await Inventory.create({
      itemName,
      purchasePrice: parseInt(purchasePrice),
      expiredDate: expiredDate || null,
      entryDate,
      userId: parseInt(userId),
      imageUrl,
    });

    console.log("✅ Inventory item created:", newInventoryItem.id);

    res.status(201).json({
      status: "Success",
      message: "Inventory item created successfully",
      isSuccess: true,
      data: newInventoryItem,
    });
  } catch (error) {
    console.error("❌ Create inventory error:", error);
    res.status(500).json({
      status: "Failed",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
}

async function updateInventory(req, res) {
  try {
    console.log("📝 Update request body:", req.body);
    console.log("📁 Update request file:", req.file);

    const { id } = req.params;
    const { itemName, purchasePrice, expiredDate, entryDate } = req.body;

    const inventoryItem = await Inventory.findByPk(id);
    if (!inventoryItem) {
      return res.status(404).json({
        status: "Failed",
        message: "Inventory item not found",
        isSuccess: false,
        data: null,
      });
    }

    let updateData = {
      itemName: itemName || inventoryItem.itemName,
      purchasePrice: purchasePrice
        ? parseInt(purchasePrice)
        : inventoryItem.purchasePrice,
      expiredDate: expiredDate || inventoryItem.expiredDate,
      entryDate: entryDate || inventoryItem.entryDate,
    };

    if (req.file) {
      const file = req.file;
      const split = file.originalname.split(".");
      const ext = split[split.length - 1];

      try {
        const uploadImg = await imagekit.upload({
          file: file.buffer,
          fileName: `${split[0]}-${Date.now()}.${ext}`,
        });

        if (!uploadImg || !uploadImg.url) {
          return res.status(500).json({
            status: "Failed",
            message: "Image upload failed",
            isSuccess: false,
            data: null,
          });
        }

        updateData.imageUrl = uploadImg.url;
        console.log("✅ New image uploaded:", uploadImg.url);
      } catch (uploadError) {
        console.error("❌ ImageKit upload error:", uploadError);
        return res.status(500).json({
          status: "Failed",
          message: "Image upload failed: " + uploadError.message,
          isSuccess: false,
          data: null,
        });
      }
    }

    await inventoryItem.update(updateData);
    const updatedItem = await Inventory.findByPk(id);

    console.log("✅ Inventory item updated:", updatedItem.id);

    res.status(200).json({
      status: "Success",
      message: "Inventory item updated successfully",
      isSuccess: true,
      data: updatedItem,
    });
  } catch (error) {
    console.error("❌ Update inventory error:", error);
    res.status(500).json({
      status: "Failed",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
}

async function deleteInventory(req, res) {
  try {
    const { id } = req.params;

    const inventoryItem = await Inventory.findByPk(id);
    if (!inventoryItem) {
      return res.status(404).json({
        status: "Failed",
        message: "Inventory item not found",
        isSuccess: false,
        data: null,
      });
    }

    await inventoryItem.destroy();

    res.status(200).json({
      status: "Success",
      message: "Inventory item deleted successfully",
      isSuccess: true,
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
}

module.exports = {
  getAllInventory,
  createInventory,
  updateInventory,
  deleteInventory,
};
