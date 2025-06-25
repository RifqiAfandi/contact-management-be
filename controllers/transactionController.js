const { Users, Transactions, Products } = require("../models");

async function getAllTransactions(req, res) {
  try {
    const userId = req.user?.id;

    const queryOptions = {
      include: [
        {
          model: Users,
          as: "user",
          attributes: ["id", "name", "email"],
        },
      ],
      order: [["createdAt", "DESC"]],
    };

    if (req.user?.role !== "admin") {
      queryOptions.where = { userId };
    }

    const transactions = await Transactions.findAll(queryOptions);

    if (transactions.length === 0) {
      return res.status(404).json({
        status: "Failed",
        message: "No transactions found",
        isSuccess: false,
        data: null,
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Transactions retrieved successfully",
      isSuccess: true,
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Failed to fetch transactions",
      isSuccess: false,
      data: null,
    });
  }
}

async function createTransaction(req, res) {
  try {
    const { item, total, subTotal, paymentMethod, name, description } =
      req.body;
    const userId = req.user?.id;

    if (!item || !Array.isArray(item) || item.length === 0) {
      return res.status(400).json({
        status: "Failed",
        message: "Items are required and must be an array",
        isSuccess: false,
        data: null,
      });
    }
    if (!total || !subTotal || !paymentMethod) {
      return res.status(400).json({
        status: "Failed",
        message: "Total, subTotal, and paymentMethod are required",
        isSuccess: false,
        data: null,
      });
    }

    // Simple validation for each item
    for (const cartItem of item) {
      if (!cartItem.productId || !cartItem.quantity || !cartItem.price) {
        return res.status(400).json({
          status: "Failed",
          message: "Each item must have productId, quantity, and price",
          isSuccess: false,
          data: null,
        });
      }
    }

    // Create transaction with simplified data
    const transactionData = {
      item: JSON.stringify(item),
      total: parseFloat(total),
      subTotal: parseFloat(subTotal),
      paymentMethod,
      name: name || req.user?.name || "Guest",
      description:
        description ||
        `Transaction by ${req.user?.name || "Guest"} with ${item.length} items`,
      userId: userId || null,
    };

    const transaction = await Transactions.create(transactionData);

    res.status(201).json({
      status: "Success",
      message: "Transaction created successfully",
      isSuccess: true,
      data: {
        transaction: {
          id: transaction.id,
          item: JSON.parse(transaction.item),
          total: transaction.total,
          subTotal: transaction.subTotal,
          paymentMethod: transaction.paymentMethod,
          name: transaction.name,
          description: transaction.description,
          userId: transaction.userId,
          createdAt: transaction.createdAt,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: `Failed to create transaction: ${error.message}`,
      isSuccess: false,
      data: null,
    });
  }
}

async function getTransactionById(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const queryOptions = {
      include: [
        {
          model: Users,
          as: "user",
          attributes: ["id", "name", "email"],
        },
      ],
    };

    // If user is not admin, only allow access to their own transactions
    if (req.user?.role !== "admin") {
      queryOptions.where = { userId };
    }

    const transaction = await Transactions.findByPk(id, queryOptions);

    if (!transaction) {
      return res.status(404).json({
        status: "Failed",
        message: "Transaction not found",
        isSuccess: false,
        data: null,
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Transaction retrieved successfully",
      isSuccess: true,
      data: {
        ...transaction.toJSON(),
        item: JSON.parse(transaction.item), // Parse JSON back to array
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Failed to fetch transaction",
      isSuccess: false,
      data: null,
    });
  }
}

async function getMonthlyRevenue(req, res) {
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
    const [year, monthNum] = month.split("-");
    const startDate = new Date(year, monthNum - 1, 1); // First day of month
    const endDate = new Date(year, monthNum, 0); // Last day of month

    const { Op } = require("sequelize");
    const { fn, col } = require("sequelize");

    // Calculate total revenue for the month
    const result = await Transactions.findOne({
      attributes: [
        [fn("COALESCE", fn("SUM", col("total")), 0), "totalRevenue"],
      ],
      where: {
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    const totalRevenue = parseFloat(result.dataValues.totalRevenue) || 0;

    res.status(200).json({
      status: "success",
      message: "Monthly revenue retrieved successfully",
      isSuccess: true,
      data: {
        month,
        totalRevenue,
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

async function checkMonthlyData(req, res) {
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
    const [year, monthNum] = month.split("-");
    const startDate = new Date(year, monthNum - 1, 1); // First day of month
    const endDate = new Date(year, monthNum, 0); // Last day of month

    const { Op } = require("sequelize");

    // Check if there are any transactions in this month
    const transactionCount = await Transactions.count({
      where: {
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    // Check if there are any inventory entries in this month
    const { Inventory } = require("../models");
    const inventoryCount = await Inventory.count({
      where: {
        entryDate: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    const hasData = transactionCount > 0 || inventoryCount > 0;

    res.status(200).json({
      status: "success",
      message: "Data check completed",
      isSuccess: true,
      data: {
        month,
        hasData,
        transactionCount,
        inventoryCount,
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

module.exports = {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  getMonthlyRevenue,
  checkMonthlyData,
};
