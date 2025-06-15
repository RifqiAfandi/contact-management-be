const { Inventory } = require("../models");
const imagekit = require("../lib/imagekit");

async function getAllInventory(req, res) {
  try {
    // Query params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const sortField = req.query.sortField || "createdAt";
    const sortOrder = req.query.sortOrder === "asc" ? "ASC" : "DESC";
    const { itemName, entryDate, expiredDate } = req.query;

    // Build where clause
    const { Op } = require("sequelize");
    const where = {};
    if (itemName) {
      where.itemName = { [Op.like]: `%${itemName}%` };
    }
    if (entryDate) {
      // entryDate can be a single date, or range: entryDate_gte, entryDate_lte
      if (req.query.entryDate_gte || req.query.entryDate_lte) {
        where.entryDate = {};
        if (req.query.entryDate_gte)
          where.entryDate[Op.gte] = req.query.entryDate_gte;
        if (req.query.entryDate_lte)
          where.entryDate[Op.lte] = req.query.entryDate_lte;
      } else {
        where.entryDate = entryDate;
      }
    }
    if (expiredDate) {
      // expiredDate can be a single date, or range: expiredDate_gte, expiredDate_lte
      if (req.query.expiredDate_gte || req.query.expiredDate_lte) {
        where.expiredDate = {};
        if (req.query.expiredDate_gte)
          where.expiredDate[Op.gte] = req.query.expiredDate_gte;
        if (req.query.expiredDate_lte)
          where.expiredDate[Op.lte] = req.query.expiredDate_lte;
      } else {
        where.expiredDate = expiredDate;
      }
    }

    // Query with filters, sorting, and pagination
    const { count, rows: inventoryItems } = await Inventory.findAndCountAll({
      where,
      limit,
      offset,
      order: [[sortField, sortOrder]],
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

async function getMonthlyExpenses(req, res) {
  try {
    const { month } = req.query; // Format: YYYY-MM
    
    if (!month) {
      return res.status(400).json({
        status: "error",
        message: "Month parameter is required (format: YYYY-MM)",
        isSuccess: false,
        data: null,
      });
    }

    // Parse month and create date range
    const [year, monthNum] = month.split('-');
    const startDate = new Date(year, monthNum - 1, 1); // First day of month
    const endDate = new Date(year, monthNum, 0); // Last day of month
    
    const { Op } = require("sequelize");
    const { fn, col, literal } = require("sequelize");

    // Calculate total expenses for the month
    const result = await Inventory.findOne({
      attributes: [
        [fn('COALESCE', fn('SUM', col('purchasePrice')), 0), 'totalExpenses']
      ],
      where: {
        entryDate: {
          [Op.between]: [startDate, endDate]
        }
      }
    });

    const totalExpenses = parseFloat(result.dataValues.totalExpenses) || 0;

    res.status(200).json({
      status: "success",
      message: "Monthly expenses retrieved successfully",
      isSuccess: true,
      data: {
        month,
        totalExpenses,
        period: {
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0]
        }
      },
    });
  } catch (error) {
    console.error("Error getting monthly expenses:", error);
    res.status(500).json({
      status: "error",
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
  getMonthlyExpenses,
};
