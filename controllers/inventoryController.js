const { Inventory } = require("../models");
const imagekit = require("../lib/imagekit");

function calculateInventoryStatus(expiredDate, useDate) {
  if (useDate) {
    return "Terpakai";
  }

  if (!expiredDate) {
    return "Baik";
  }

  const now = new Date();
  const expiry = new Date(expiredDate);
  const diffTime = expiry - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return "Expired";
  } else if (diffDays <= 7) {
    return "Segera Expired";
  } else {
    return "Baik";
  }
}

async function getAllInventory(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const sortField = req.query.sortField || "createdAt";
    const sortOrder = req.query.sortOrder === "asc" ? "ASC" : "DESC";
    const { itemName, entryDate, expiredDate, supplierName, status } =
      req.query;

    const allowedSortFields = [
      "createdAt",
      "entryDate",
      "expiredDate",
      "itemName",
      "purchasePrice",
      "supplierName",
      "useDate",
      "status",
    ];
    const validSortField = allowedSortFields.includes(sortField)
      ? sortField
      : "createdAt";

    const { Op } = require("sequelize");
    const where = {};
    if (itemName) {
      where.itemName = { [Op.like]: `%${itemName}%` };
    }
    if (supplierName) {
      where.supplierName = { [Op.like]: `%${supplierName}%` };
    }
    if (status) {
      where.status = status;
    }
    if (entryDate) {
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

    let orderClause;
    if (validSortField === "itemName" || validSortField === "supplierName") {
      const { literal } = require("sequelize");
      orderClause = [[literal(`${validSortField} COLLATE NOCASE`), sortOrder]];
    } else {
      orderClause = [[validSortField, sortOrder]];
    }

    const { count, rows: inventoryItems } = await Inventory.findAndCountAll({
      where,
      limit,
      offset,
      order: orderClause,
    });

    const updatedItems = await Promise.all(
      inventoryItems.map(async (item) => {
        const calculatedStatus = calculateInventoryStatus(
          item.expiredDate,
          item.useDate
        );
        if (item.status !== calculatedStatus) {
          await item.update({ status: calculatedStatus });
        }
        return { ...item.toJSON(), status: calculatedStatus };
      })
    );

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
      data: updatedItems,
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
    const {
      itemName,
      purchasePrice,
      expiredDate,
      entryDate,
      userId,
      supplierName,
      useDate,
    } = req.body;

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
      } catch (uploadError) {
        return res.status(500).json({
          status: "Failed",
          message: "Image upload failed: " + uploadError.message,
          isSuccess: false,
          data: null,
        });
      }
    }
    const calculatedStatus = calculateInventoryStatus(expiredDate, useDate);

    const newInventoryItem = await Inventory.create({
      itemName,
      purchasePrice: parseInt(purchasePrice),
      expiredDate: expiredDate || null,
      entryDate,
      userId: parseInt(userId),
      supplierName: supplierName || null,
      useDate: useDate || null,
      status: calculatedStatus,
      imageUrl,
    });

    res.status(201).json({
      status: "Success",
      message: "Inventory item created successfully",
      isSuccess: true,
      data: newInventoryItem,
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

async function updateInventory(req, res) {
  try {
    const { id } = req.params;
    const {
      itemName,
      purchasePrice,
      expiredDate,
      entryDate,
      supplierName,
      useDate,
    } = req.body;

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
      expiredDate:
        expiredDate !== undefined ? expiredDate : inventoryItem.expiredDate,
      entryDate: entryDate || inventoryItem.entryDate,
      supplierName:
        supplierName !== undefined ? supplierName : inventoryItem.supplierName,
      useDate: useDate !== undefined ? useDate : inventoryItem.useDate,
    };

    updateData.status = calculateInventoryStatus(
      updateData.expiredDate,
      updateData.useDate
    );

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
      } catch (uploadError) {
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

    res.status(200).json({
      status: "Success",
      message: "Inventory item updated successfully",
      isSuccess: true,
      data: updatedItem,
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
    const { month } = req.query;

    if (!month) {
      return res.status(400).json({
        status: "error",
        message: "Month parameter is required (format: YYYY-MM)",
        isSuccess: false,
        data: null,
      });
    }

    const [year, monthNum] = month.split("-");
    const startDate = new Date(year, monthNum - 1, 1);
    const endDate = new Date(year, monthNum, 0);

    const { Op } = require("sequelize");
    const { fn, col, literal } = require("sequelize");

    const result = await Inventory.findOne({
      attributes: [
        [fn("COALESCE", fn("SUM", col("purchasePrice")), 0), "totalExpenses"],
      ],
      where: {
        entryDate: {
          [Op.between]: [startDate, endDate],
        },
      },
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
          startDate: startDate.toISOString().split("T")[0],
          endDate: endDate.toISOString().split("T")[0],
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
}

async function getAllInventoryNoPagination(req, res) {
  try {
    const sortField = req.query.sortField || "createdAt";
    const sortOrder = req.query.sortOrder === "asc" ? "ASC" : "DESC";
    const { itemName, entryDate, expiredDate, supplierName, status } =
      req.query;

    const allowedSortFields = [
      "createdAt",
      "entryDate",
      "expiredDate",
      "itemName",
      "purchasePrice",
      "supplierName",
      "useDate",
      "status",
    ];
    const validSortField = allowedSortFields.includes(sortField)
      ? sortField
      : "createdAt";

    const { Op } = require("sequelize");
    const where = {};
    if (itemName) {
      where.itemName = { [Op.like]: `%${itemName}%` };
    }
    if (supplierName) {
      where.supplierName = { [Op.like]: `%${supplierName}%` };
    }
    if (status) {
      where.status = status;
    }
    if (entryDate) {
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

    let orderClause;
    if (validSortField === "itemName" || validSortField === "supplierName") {
      const { literal } = require("sequelize");
      orderClause = [[literal(`${validSortField} COLLATE NOCASE`), sortOrder]];
    } else {
      orderClause = [[validSortField, sortOrder]];
    }

    const inventoryItems = await Inventory.findAll({
      where,
      order: orderClause,
    });
    const updatedItems = await Promise.all(
      inventoryItems.map(async (item) => {
        const calculatedStatus = calculateInventoryStatus(
          item.expiredDate,
          item.useDate
        );
        if (item.status !== calculatedStatus) {
          await item.update({ status: calculatedStatus });
        }
        return { ...item.toJSON(), status: calculatedStatus };
      })
    );

    res.status(200).json({
      status: "Success",
      message:
        updatedItems.length > 0
          ? "All inventory items retrieved successfully"
          : "No inventory items found",
      isSuccess: true,
      data: updatedItems,
      totalItems: updatedItems.length,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
}

async function checkMonthlyData(req, res) {
  try {
    const { month } = req.query;

    if (!month) {
      return res.status(400).json({
        status: "error",
        message: "Month parameter is required (format: YYYY-MM)",
        isSuccess: false,
        data: null,
      });
    }

    const [year, monthNum] = month.split("-");
    const startDate = new Date(year, monthNum - 1, 1);
    const endDate = new Date(year, monthNum, 0);

    const { Op } = require("sequelize");

    const inventoryCount = await Inventory.count({
      where: {
        entryDate: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    const hasData = inventoryCount > 0;

    res.status(200).json({
      status: "success",
      message: "Data check completed",
      isSuccess: true,
      data: {
        month,
        hasData,
        inventoryCount,
        period: {
          startDate: startDate.toISOString().split("T")[0],
          endDate: endDate.toISOString().split("T")[0],
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
}

async function getInventoryByMonth(req, res) {
  try {
    const { month } = req.query;
    const sortField = req.query.sortField || "createdAt";
    const sortOrder = req.query.sortOrder === "asc" ? "ASC" : "DESC";
    const { itemName, status } = req.query;

    if (!month) {
      return res.status(400).json({
        status: "error",
        message: "Month parameter is required (format: YYYY-MM)",
        isSuccess: false,
        data: null,
      });
    }

    const [year, monthNum] = month.split("-");
    const startDate = new Date(year, monthNum - 1, 1);
    const endDate = new Date(year, monthNum, 0);

    const allowedSortFields = [
      "createdAt",
      "entryDate",
      "expiredDate",
      "itemName",
      "purchasePrice",
    ];
    const validSortField = allowedSortFields.includes(sortField)
      ? sortField
      : "createdAt";

    const { Op } = require("sequelize");
    const where = {
      entryDate: {
        [Op.between]: [startDate, endDate],
      },
    };

    if (itemName) {
      where.itemName = { [Op.like]: `%${itemName}%` };
    }
    if (status) {
      where.status = status;
    }

    let orderClause;
    if (validSortField === "itemName") {
      const { literal } = require("sequelize");
      orderClause = [[literal(`${validSortField} COLLATE NOCASE`), sortOrder]];
    } else {
      orderClause = [[validSortField, sortOrder]];
    }
    const inventoryItems = await Inventory.findAll({
      where,
      order: orderClause,
    });

    const updatedItems = await Promise.all(
      inventoryItems.map(async (item) => {
        const calculatedStatus = calculateInventoryStatus(
          item.expiredDate,
          item.useDate
        );
        if (item.status !== calculatedStatus) {
          await item.update({ status: calculatedStatus });
        }
        return { ...item.toJSON(), status: calculatedStatus };
      })
    );

    res.status(200).json({
      status: "Success",
      message: `Inventory items for ${month} retrieved successfully`,
      isSuccess: true,
      data: updatedItems,
      totalItems: updatedItems.length,
      period: {
        month,
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
}

async function getLowStockNotification(req, res) {
  try {
    const { Op, fn, col } = require("sequelize");

    const allInventoryItemCounts = await Inventory.findAll({
      attributes: [
        "itemName",
        [fn("COUNT", col("itemName")), "itemCount"],
        [fn("MIN", col("id")), "sampleId"],
      ],
      where: {
        useDate: null,
      },
      group: ["itemName"],
      raw: true,
    });

    const hasDuplicates = allInventoryItemCounts.some(
      (item) => parseInt(item.itemCount) > 1
    );

    let lowStockItemCounts;
    if (!hasDuplicates) {
      lowStockItemCounts = allInventoryItemCounts;
    } else {
      lowStockItemCounts = allInventoryItemCounts.filter(
        (item) => parseInt(item.itemCount) < 3
      );
    }

    if (lowStockItemCounts.length === 0) {
      return res.status(200).json({
        status: "Success",
        message: "No low stock items found",
        isSuccess: true,
        data: [],
        logic: hasDuplicates ? "standard" : "no_duplicates",
      });
    }
    const lowStockItems = await Promise.all(
      lowStockItemCounts.map(async (item) => {
        const sampleItem = await Inventory.findByPk(item.sampleId);
        return {
          id: sampleItem.id,
          itemName: item.itemName,
          itemCount: parseInt(item.itemCount),
          imageUrl: sampleItem.imageUrl,
          purchasePrice: sampleItem.purchasePrice,
          entryDate: sampleItem.entryDate,
          supplierName: sampleItem.supplierName,
          status: "Hampir Habis",
          logic: hasDuplicates ? "standard" : "no_duplicates",
        };
      })
    );

    res.status(200).json({
      status: "Success",
      message: hasDuplicates
        ? "Low stock items retrieved successfully (standard logic)"
        : "All items retrieved - no duplicates found (all items shown)",
      isSuccess: true,
      data: lowStockItems,
      totalItems: lowStockItems.length,
      logic: hasDuplicates ? "standard" : "no_duplicates",
      explanation: hasDuplicates
        ? "Items with count < 3 are shown"
        : "No duplicates found - all items are shown",
    });
  } catch (error) {
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
  getAllInventoryNoPagination,
  createInventory,
  updateInventory,
  deleteInventory,
  getMonthlyExpenses,
  checkMonthlyData,
  getInventoryByMonth,
  getLowStockNotification,
};
